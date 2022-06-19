import { createAction } from '@ngrx/store'
import { ActionTypes } from '../actionTypes'

export const getFeedAction = createAction(ActionTypes.GET_FEED)
