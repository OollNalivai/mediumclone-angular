import { AppStateInterface } from '../../shared/types/app-state.interface'
import { createSelector } from '@ngrx/store'
import { SettingsStateInterface } from '../types/settings-stateInterface'

export const settingsFeatureSelector =
  (state: AppStateInterface): SettingsStateInterface => state.settings;

export const isSubmittingSelector =
  createSelector(settingsFeatureSelector,
    (settingsState: SettingsStateInterface) => settingsState.isSubmitting);

export const validationErrorsSelector =
  createSelector(settingsFeatureSelector,
    (settingsState: SettingsStateInterface) => settingsState.validationErrors);
