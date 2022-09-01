import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { HttpErrorResponse } from '@angular/common/http'
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from '../actions/updateCurrentUser.action'

@Injectable()

export class UpdateCurrentUserEffect {

  updateCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateCurrentUserAction),

    switchMap(({ currentUserInput }) => {
      console.log('currentUserInput Action request', currentUserInput)
      return this.authService.updateCurrentUser(currentUserInput)
        .pipe(map((currentUser: CurrentUserInterface) => {
            console.log('updateCurrentUser current User', currentUser)
            return updateCurrentUserSuccessAction({ currentUser })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Register Effect Error', catchError)
            return of(updateCurrentUserFailureAction({ errors: errorResponse.error.errors }))
          })
        )
    })
  ))

  constructor(private actions$: Actions,
              private authService: AuthService) {
  }

}
