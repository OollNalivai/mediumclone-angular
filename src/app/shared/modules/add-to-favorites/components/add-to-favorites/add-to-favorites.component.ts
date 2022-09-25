import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { addToFavoritesAction } from '../../store/actions/add-to-favorites.action'

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit {

  @Input('isFavorite') isFavoriteProps: boolean
  @Input('articleSlug') articleSlugProps: string
  @Input('favoritesCount') favoritesCountProps: number

  favoritesCount: number
  isFavorite: boolean

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountProps
    this.isFavorite = this.isFavoriteProps
  }

  handleLike(): void {

    this.store.dispatch(addToFavoritesAction({
      isFavorited: this.isFavorite,
      slug: this.articleSlugProps
    }))

    this.isFavorite ? this.favoritesCount -= 1 : this.favoritesCount += 1;

    this.isFavorite = !this.isFavorite
  }
}
