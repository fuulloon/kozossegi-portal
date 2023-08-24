import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { UserStateService } from './module/user/state';
import * as UserActions from './module/user/ngrx/user.actions';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { AuthUtilService } from './auth/service/auth-util.service';
import { AuthStateService } from './auth/service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './shared/ngrx/app-state.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'kozossegi-portal';

  public constructor(private userStateService: UserStateService,
                     private authStateService: AuthStateService,
                     private store: Store<AppStateInterface>) {}

  public ngOnInit(): void {
    //this.userStateService.dispatchGetUsers();
    this.authStateService.getAuthenticatedUser().pipe(map(user => !!user))
    .subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.store.dispatch(UserActions.getUsers());
      }
    });
  }

}
