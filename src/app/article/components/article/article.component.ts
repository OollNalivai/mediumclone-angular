import { Component, OnDestroy, OnInit } from '@angular/core'
import { ArticleInterface } from '../../../shared/types/article.interface'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { getArticleAction } from '../../store/actions/getArticle.action'
import { articleSelector, errorSelector, isLoadingSelector } from '../../store/selectors'
import { combineLatest, map, Observable, Subscription } from 'rxjs'
import { currentUserSelector } from '../../../auth/store/selectors'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  slug: string
  article: ArticleInterface | null
  articleSubscription: Subscription
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  isAuthor$: Observable<boolean>

  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe()
  }

  private initializeValues() {
    this.slug = this.route.snapshot.paramMap.get('slug')
    console.log('this.slug = ', this.slug)
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))

    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))]
    )
      .pipe(map(
        ([article, currentUser]: [
            ArticleInterface | null,
            CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) return false
          console.log('map article', article)
          console.log('map currentUser', currentUser)
          return currentUser.username === article.author.username
        }
      ))
  }

  private initializeListeners() {
    // вывод самого article без subscribe
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article
      })

  }

  private fetchData() {
    this.store.dispatch(getArticleAction({ slug: this.slug }))
  }
}
