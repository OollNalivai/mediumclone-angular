import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { CreateArticleService } from '../../services/createArticle.service'
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from '../actions/createArticle.action'
import { ArticleInterface } from '../../../shared/types/article.interface'


@Injectable()

export class CreateArticleAffect {

  createArticle$ = createEffect(() => this.actions$.pipe(
    ofType(createArticleAction),

    switchMap(({ articleInput }) => {
      console.log('articleInput: ', articleInput)
      return this.createArticleService.createArticle(articleInput)

        .pipe(map((article: ArticleInterface) => {
            return createArticleSuccessAction({article})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Register Effect Error', catchError)
            return of(createArticleFailureAction({ errors: errorResponse.error.errors }))
          })
        )
    })
  ))

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/article', article.slug]).then(r => r)
        })
      ), { dispatch: false }
  )

  constructor(private actions$: Actions,
              private createArticleService: CreateArticleService,
              private router: Router) {
  }

}
