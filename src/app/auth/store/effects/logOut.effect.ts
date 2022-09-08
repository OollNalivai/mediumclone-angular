import { Injectable } from '@angular/core'
import { createEffect, ofType } from '@ngrx/effects'
import { PersistenceService } from '../../../shared/services/persistence.service'
import { logoutAction } from '../sync.action'
import { pipe, tap } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()

export class LogOutEffect {

  // logout$ = createEffect(
  //   () => this.actions$,pipe(
  //     ofType(logoutAction),
  //     tap(() => {
  //       this.persistenceService.set('accessToken', '')
  //       this.router.navigateByUrl('/')
  //     })
  //   ),
  //   {dispatch: false}
  // )

  constructor(private actions$, private persistenceService: PersistenceService, router: Router ) {
  }
}
