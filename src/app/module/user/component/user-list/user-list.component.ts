import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map,
          Observable } from 'rxjs';
import { AuthStateService } from 'src/app/auth/service';
import { User } from 'src/app/module/user/model/user.model';
import { NotificationService } from 'src/app/module/newsfeed/service/notification-util.service';
import { UserStateService } from '../../state';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../../ngrx/user.actions';
import { errorSelector, isLoadingSelector, usersSelector } from '../../ngrx/user.selector';
import { AppStateInterface } from '../../../../shared/ngrx/app-state.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private filter$$: BehaviorSubject<string>;
  private users: User[] = [];

  public authenticatedUser!: User;
  public filter: string = 'all';
  public filteredUsers$!: Observable<User[]>;

  // isLoading$: Observable<boolean>;
  // error$: Observable<string | null>;
  users$: Observable<User[]>;

  constructor(private userStateService: UserStateService,
              private authStateService: AuthStateService,
              private notificationService: NotificationService,
              private store: Store<AppStateInterface>) {
    this.filter$$ = new BehaviorSubject(this.filter);

    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // this.error$ = this.store.pipe(select(errorSelector));
    this.users$ = this.store.pipe(select(usersSelector));
  }

  ngOnInit(): void {

    this.filteredUsers$ = combineLatest([
      //this.userStateService.getUsers(),
      this.store.pipe(select(usersSelector)),
      this.filter$$,
      this.authStateService
        .getAuthenticatedUser()
        .pipe(filter((authenticatedUser) => !!authenticatedUser)),
    ])
    .pipe(
      map(([users, filter, authenticatedUser]) => {
        this.authenticatedUser = authenticatedUser as User;
        return this.filterUsers(filter, users);
      })
    );
  }

  public acceptMark(userId: number): void {
    this.authenticatedUser.contacts.push(userId);
    this.userStateService.dispatchUpdateUser(this.authenticatedUser);

    this.users.forEach((otherUser) => {
      otherUser.contacts.push(this.authenticatedUser!.id);
          const indexToRemove = otherUser.markedUsers.indexOf(this.authenticatedUser!.id);
          if (indexToRemove > -1) {
            otherUser.markedUsers.splice(indexToRemove, 1);
          }
          this.userStateService.dispatchUpdateUser(otherUser);
    })
  }

  public activate(userId: number): void {
    let userToActivate = this.users.find((user) => user.id === userId);
    if (userToActivate) {
      userToActivate.active = true;
      this.userStateService.dispatchUpdateUser(userToActivate);
    }
  }

  public cancelMark(userId: number): void {
    const indexToRemove = this.authenticatedUser.markedUsers.indexOf(userId);
    if (indexToRemove > -1) {
      this.authenticatedUser.markedUsers.splice(indexToRemove, 1);
    }
    this.userStateService.dispatchUpdateUser(this.authenticatedUser);
  }

  public declineMark(user: User): void {
    this.userStateService.dispatchUpdateUser(user);
  }

  public markUser(userId: number): void {
    this.authenticatedUser?.markedUsers.push(userId);
    this.userStateService.dispatchUpdateUser(this.authenticatedUser as User);
    this.notificationService.addNotification('markUser', userId);
  }

  public setFilter(filter: string): void {
    this.filter = filter;
    this.filter$$.next(filter);
  }

  public trackByUserId(index: number, user: User): number {
    return user.id;
  }

  private filterUsers(filter: string, users: User[]): User[] {
    if (filter !== 'all') {
      return users.filter(
        (user) => user.contactState === filter && user.contactState !== 'own'
      );
    }
    return users.filter((user) => user.contactState !== 'own');
  }
}
