import { Component, OnInit } from '@angular/core'
import { ProfileInterface } from '../../../shared/types/profile.interface'
import { combineLatest, map, Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { getUserProfileAction } from '../../store/actions/getUserProfile.action'
import { errorSelector, isLoadingSelector, userProfileSelector } from '../../store/selectors'
import { currentUserSelector } from '../../../auth/store/selectors'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'

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

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))

    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(currentUserSelector)),
      this.store.pipe(select(userProfileSelector))]
    ).pipe(map(([currentUser, userProfile]:
                  [CurrentUserInterface, ProfileInterface]) => {
          return currentUser.username === userProfile.username
        }
      )
    )
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile
      })

    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }))
  }

}
