import { Component, OnInit } from '@angular/core'
import { ProfileInterface } from '../../../shared/types/profile.interface'
import { filter, map, Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute, Router } from '@angular/router'
import { getUserProfileAction } from '../../store/actions/getUserProfile.action'
import { errorSelector, isLoadingSelector, userProfileSelector } from '../../store/selectors'
import { combineLatest } from 'rxjs/operators'
import { currentUserSelector } from '../../../auth/store/selectors'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { articleSelector } from '../../../article/store/selectors'

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: ProfileInterface
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  isCurrentUserProfile$: Observable<boolean>
  userProfileSubscription: Subscription
  slug: string
  apiUrl: string

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router) {
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
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    )
      .pipe(map(
          ([currentUser, userProfile]:
             [CurrentUserInterface, ProfileInterface]) => {
            return currentUser.username === userProfile.username
          }
        )
      )
  }

  initializeListeners(): void {

  }

  fetchData(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }))
  }

}
