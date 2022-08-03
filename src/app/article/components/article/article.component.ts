import { Component, OnDestroy, OnInit } from '@angular/core'
import { ArticleInterface } from '../../../shared/types/article.interface'
import { Observable, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  slug: string
  article: ArticleInterface
  articleSubscription: Subscription
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  isAuthor$: Observable<boolean>

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {
  }

  private initializeValues() {

  }

  private initializeListeners() {

  }

  private fetchData() {

  }
}
