import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import {
  getFeedAction,
  getFeedSuccessAction,
  getFeedFailureAction
} from '../actions/get-feed.action'
import { catchError, map, of, switchMap } from 'rxjs'
import { FeedService } from '../../services/feed.service'
import { GetFeedResponseInterface } from '../../types/get-feed-response.interface'

@Injectable()

export class GetFeedEffect {

  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(getFeedAction),
    switchMap(({url}) => {
      return this.feedService.getFeed(url)
        .pipe(map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({ feed })
          }),

          catchError(() => {
            return of(getFeedFailureAction())
          })
        )
    })
  ))

  constructor(private actions$: Actions,
              private feedService: FeedService) {
  }

}
