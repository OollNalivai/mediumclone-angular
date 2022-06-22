import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import {
  getFeedAction,
  getFeedSuccessAction,
  getFeedFailureAction
} from '../actions/getFeed.action'
import { catchError, map, of, switchMap } from 'rxjs'
import { FeedService } from '../../services/feed.service'
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface'

@Injectable()

export class GetFeedEffect {

  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(getFeedAction),
    switchMap(({url}) => {
      return this.feedService.getFeed(url)
        .pipe(map((feed: GetFeedResponseInterface) => {
            console.log('feed', feed)
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
