import { createAction, props } from '@ngrx/store'
import { ActionTypes } from '../actionTypes'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<RegisterRequestInterface>()
)

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<RegisterRequestInterface>()
)
