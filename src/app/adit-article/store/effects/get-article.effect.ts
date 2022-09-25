import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'

import { ArticleInterface } from '../../../shared/types/article.interface'
import { ArticleService as SharedArticleService } from '../../../shared/services/article.service'
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from '../actions/get-article.action'


@Injectable()

export class GetArticleEffect {

  geteArticle$ = createEffect(() => this.actions$.pipe(
    ofType(getArticleAction),

    switchMap(({ slug }) => {
      console.log('getArticle$ slug: ', slug)
      return this.sharedArticleService.getArticle(slug)
        .pipe(map((article: ArticleInterface) => {
            return getArticleSuccessAction({ article })
          }),

          catchError(() => {
            console.log('Register Effect Error', catchError)
            return of(getArticleFailureAction())
          })
        )
    })
  ))

  constructor(private actions$: Actions,
              private sharedArticleService: SharedArticleService) {
  }

}
