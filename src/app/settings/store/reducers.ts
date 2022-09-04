import { SettingsStateInterface } from '../types/settingsStateInterface'
import { createReducer, on } from '@ngrx/store'
import { updateCurrentUserAction } from '../../auth/store/actions/updateCurrentUser.action'

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null
}

const settingsReducer = createReducer(
  initialState,
  on(updateCurrentUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true
    }))
)
