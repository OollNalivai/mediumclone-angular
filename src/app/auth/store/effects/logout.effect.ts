import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { PersistenceService } from '../../../shared/services/persistence.service'
import { logoutAction } from '../sync.action'
import { tap } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()

export class LogoutEffect {

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logoutAction),
      tap(() => {
        this.persistenceService.set('accessToken', '')
        this.router.navigateByUrl('/')
      })
    ),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private persistenceService: PersistenceService, private router: Router ) {
  }
}
