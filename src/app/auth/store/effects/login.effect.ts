import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction
} from '../actions/login.action'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { HttpErrorResponse } from '@angular/common/http'
import { PersistenceService } from '../../../shared/services/persistence.service'
import { Router } from '@angular/router'


@Injectable()

export class LoginEffect {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),

    switchMap(({ request }) => {
      console.log('register Action request', request)
      return this.authService.login(request)

        .pipe(map((currentUser: CurrentUserInterface) => {
            console.log('current User', currentUser)
            this.persistenceService.set('accessToken', currentUser.token)
            return loginSuccessAction({ currentUser })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Register Effect Error', catchError)
            return of(loginFailureAction({ errors: errorResponse.error.errors }))
          })
        )
    })
  ))

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/').then(r => r)
        })
      ), { dispatch: false }
  )

  constructor(private actions$: Actions,
              private authService: AuthService,
              private persistenceService: PersistenceService,
              private router: Router) {
  }

}
