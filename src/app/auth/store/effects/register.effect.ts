import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction
} from '../actions/register.action'
import { catchError, map, of, switchMap } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'

@Injectable()

export class RegisterEffect {

  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({ request }) => {
      console.log('register Action request', request)
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          console.log('current User', currentUser)
          return registerSuccessAction({ currentUser })
        }),
        catchError(() => {
          console.log('Register Effect Error', catchError)
          return of(registerFailureAction())
        })
      )
    })
  ))

  constructor(private actions$: Actions, private authService: AuthService) {
  }

}
