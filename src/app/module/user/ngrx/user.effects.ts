import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { UserDataService } from '../data';
import { catchError, map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { User } from '../model/user.model';
import { AuthStateService } from 'src/app/auth/service';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private userDataService: UserDataService,
              private authStateService: AuthStateService) {}

  getUsers$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(UserActions.getUsers)),
      this.authStateService.getAuthenticatedUser()
    ]).pipe(
      switchMap(([_, authenticatedUser]) => {
        return this.userDataService.getUsers().pipe(
          map(users => {
            const usersWithContactStates = users.map((user) => ({ ...user,
              contactState: this.getUserContactState(authenticatedUser, user, users)
            }));
            return UserActions.getUsersSuccess({ users: usersWithContactStates });
          }),
          catchError(error =>
            of(UserActions.getUsersFailure(
              { error: error.message }
            ))
          )
        )
      })
    )
  )

  private getUserContactState(authenticatedUser: User | null, user: User, users: User[] ): string {
    if (authenticatedUser) {
      const userContacts =
        users.find((user) => user.id === authenticatedUser!.id)?.contacts || [];
      const markedUserIds =
        users.find((user) => user.id === authenticatedUser!.id)?.markedUsers || [];

      if (user.id !== authenticatedUser.id) {
        if (userContacts.includes(user.id)) {
          return 'contact';
        }

        if (
          !userContacts.includes(user.id) &&
          !markedUserIds.includes(user.id) &&
          !user.markedUsers.includes(authenticatedUser.id) &&
          user.id !== authenticatedUser.id
        ) {
          return 'unknown';
        }

        if (markedUserIds.includes(user.id)) {
          return 'marked';
        }

        if (user.markedUsers.includes(authenticatedUser.id)) {
          return 'markedBy';
        }
      }

      return 'own';
    }

    return '';
  }

}
