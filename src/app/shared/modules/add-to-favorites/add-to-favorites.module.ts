import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component'
import { AddToFavoritesService } from './services/add-to-favorites.service'
import { EffectsModule } from '@ngrx/effects'
import { AddToFavoriteEffect } from './store/effects/add-to-favorite.effect'

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoriteEffect])],
  exports: [
    AddToFavoritesComponent
  ],
  declarations: [
    AddToFavoritesComponent
  ],
  providers: [
    AddToFavoritesService
  ]
})

export class AddToFavoritesModule {
}
