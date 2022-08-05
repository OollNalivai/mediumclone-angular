import { Component, OnDestroy, OnInit } from '@angular/core'
import { ArticleInterface } from '../../../shared/types/article.interface'
import { Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { getArticleAction } from '../../store/actions/getArticle.action'
import { articleSelector } from '../../store/selectors'

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
  }

  private initializeValues() {
    this.slug = this.route.snapshot.paramMap.get('slug')
    console.log('this.slug = ', this.slug)
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
}
