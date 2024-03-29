import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { getFeedAction } from '../../store/actions/get-feed.action'
import { Observable, Subscription } from 'rxjs'
import { GetFeedResponseInterface } from '../../types/get-feed-response.interface'
import { errorSelector, feedSelector, isLoadingSelector } from '../../store/selectors'
import { environment } from '../../../../../../environments/environment'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { parseUrl, stringify } from 'query-string'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {

  @Input('apiUrl') apiUrlProps: string

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>
  limit: number = environment.limit
  baseUrl: string
  queryParamsSubscription: Subscription
  currentPage: number

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiChanged =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !== changes['apiUrlProps'].previousValue
    if (isApiChanged) {
      this.fetchFeed()
    }
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector));
    [this.baseUrl] = this.router.url.split('?')
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1')
        this.fetchFeed()
      })
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = parseUrl(this.apiUrlProps)
    const stringifyParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifyParams}`
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }))
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
  }
}
