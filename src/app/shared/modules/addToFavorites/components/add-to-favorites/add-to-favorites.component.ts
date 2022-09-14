import { Component, Input, OnInit } from '@angular/core'

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

  constructor() { }

  ngOnInit(): void {
    console.log(this.favoritesCountProps);
    this.favoritesCount = this.favoritesCountProps
    this.isFavorite = this.isFavoriteProps
  }

  handleLike(): void {
    this.isFavorite ? this.favoritesCount -= 1 : this.favoritesCount += 1;

    this.isFavorite = !this.isFavorite
  }
}
