import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'

import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction } from '../actions/get-popular-tags.action'

import { catchError, map, of, switchMap } from 'rxjs'
import { PopularTagsService } from '../../services/popular-tags.service'
import { PopularTagType } from '../../../../types/popular-tag.type'

@Injectable()

export class GetPopularTagsEffect {

  getPopularTags$ = createEffect(() => this.actions$.pipe(
    ofType(getPopularTagsAction),
    switchMap(() => {
      return this.popularTagsService.getPopularTags()
        .pipe(map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({ popularTags })
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction())
          })
        )
    })
  ))

  constructor(private actions$: Actions,
              private popularTagsService: PopularTagsService) {
  }

}
