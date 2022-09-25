import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

import { ArticleInterface } from '../../../shared/types/article.interface'
import { EditArticleService } from '../../services/edit-article.service'
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from '../actions/update-article.action'


@Injectable()

export class UpdateArticleEffect {

  updateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleAction),

    switchMap(({ articleInput, slug }) => {
      console.log('articleInput: ', articleInput, 'slug: ', slug)
      return this.editArticleService.updateArticle(slug, articleInput)
        .pipe(map((article: ArticleInterface) => {
            return updateArticleSuccessAction({ article })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Register Effect Error', catchError)
            return of(updateArticleFailureAction({ errors: errorResponse.error.errors }))
          })
        )
    })
  ))

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]).then(r => r)
        })
      ), { dispatch: false }
  )

  constructor(private actions$: Actions,
              private editArticleService: EditArticleService,
              private router: Router) {
  }

}
