import { AuthStateInterface } from '../types/authState.interface'
import { createReducer, on, Action } from '@ngrx/store'
import { registerAction, registerSuccessAction } from './actions/register.action'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
}

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      validationErrors: null,
      currentUser: action.currentUser
    })),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      // validationErrors: action.errprs
    }))
)

// export function reducers(state: AuthStateInterface, action: Action) {
//   return authReducer(state, action);
// }
