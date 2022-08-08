import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction
} from '../actions/deleteArticle.action'
import { ArticleService } from '../../services/article.service'

@Injectable()

export class DeleteArticleEffect {

  deleteArticle$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleAction),
    switchMap(({ slug }) => {
      return this.articleService.deleteArticle( slug )
        .pipe(map(() => {
            return deleteArticleSuccessAction()
          }),

          catchError(() => {
            return of(deleteArticleFailureAction())
          })
        )
    })
  ))

  constructor(private actions$: Actions,
              private articleService: ArticleService) {
  }

}
