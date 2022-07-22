import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'mc-feed-toggle',
  templateUrl: './feed-toggle.component.html',
  styleUrls: ['./feed-toggle.component.scss']
})
export class FeedToggleComponent implements OnInit {

  @Input('tagName') tagNameProps: string | null

  isLoggedIn$: Observable<boolean>

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
