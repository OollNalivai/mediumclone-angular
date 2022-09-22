import { Component, OnInit } from '@angular/core'
import { ProfileInterface } from '../../../shared/types/profile.interface'
import { Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute, Router } from '@angular/router'
import { getUserProfileAction } from '../../store/actions/getUserProfile.action'
import { errorSelector, isLoadingSelector } from '../../store/selectors'

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: ProfileInterface
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  userProfileSubscription: Subscription
  slug: string
  apiUrl: string

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    const isFavorites = this.router.url.includes('favorites')
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }

  fetchData(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }))
  }

}
