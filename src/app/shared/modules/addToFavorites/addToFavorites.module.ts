import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component'
import { AddToFavoritesService } from './services/addToFavorites.service'

@NgModule({
  imports: [CommonModule],
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
