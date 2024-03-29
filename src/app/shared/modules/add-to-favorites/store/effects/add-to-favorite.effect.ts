import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from '../actions/add-to-favorites.action'
import { AddToFavoritesService } from '../../services/add-to-favorites.service'
import { ArticleInterface } from '../../../../types/article.interface'

@Injectable()

export class AddToFavoriteEffect {

  addToFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(addToFavoritesAction),
    switchMap(({ isFavorited, slug }) => {
      const article$ = isFavorited ? this.addToFavoritesService.removeFromFavorites(slug)
        : this.addToFavoritesService.addToFavorites(slug);

        return article$.pipe(

          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({ article })
          }),

          catchError(() => {
            return of(addToFavoritesFailureAction())
          })
        )
    })
  ))

  constructor(private actions$: Actions,
              private addToFavoritesService: AddToFavoritesService) {
  }

}
