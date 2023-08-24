import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/ngrx/app-state.interface';

export const selectFeature = (state: AppStateInterface) => state.users;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const usersSelector = createSelector(
  selectFeature,
  (state) => state.users
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
