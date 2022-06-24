import { FeedStateInterface } from '../types/feedState.interface'
import { createReducer, on } from '@ngrx/store'
import { getFeedAction } from './actions/getFeed.action'

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true
    })
  )
)
