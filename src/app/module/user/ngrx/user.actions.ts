import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const getUsers = createAction(
  '[User] Load Users'
);

export const getUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const getUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);
