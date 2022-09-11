import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component'

@NgModule({
  imports: [CommonModule],
  exports: [
    AddToFavoritesComponent
  ],
  declarations: [
    AddToFavoritesComponent
  ]
})

export class AddToFavoritesModule {

}
