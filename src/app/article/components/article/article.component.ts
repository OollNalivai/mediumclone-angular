import { Component, OnDestroy, OnInit } from '@angular/core'
import { ArticleInterface } from '../../../shared/types/article.interface'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { getArticleAction } from '../../store/actions/get-article.action'
import { articleSelector, errorSelector, isLoadingSelector } from '../../store/selectors'
import { combineLatest, map, Observable, Subscription } from 'rxjs'
import { currentUserSelector } from '../../../auth/store/selectors'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { deleteArticleAction } from '../../store/actions/delete-article.action'

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
          return currentUser.username === article.author.username
        }
      ))
  }

  private initializeListeners() {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article
      })

  }

  private fetchData() {
    this.store.dispatch(getArticleAction({ slug: this.slug }))
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }))
  }
}
