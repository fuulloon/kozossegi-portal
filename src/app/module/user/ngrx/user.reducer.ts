import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user-state.interface';

const initialState: UserState = {
  isLoading: false,
  users: [],
  error: null
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.getUsers,
      (state) => ({ ...state, isLoading: true })
  ),

  on(UserActions.getUsersSuccess,
      (state, action) => ({ ...state, isLoading: false, users: action.users })
  ),

  on(UserActions.getUsersFailure,
      (state, action) => ({ ...state, isLoading: false, error: action.error })
  ),

);
