import { Component, OnInit } from '@angular/core';
import { ArticleInputInterface } from '../../../shared/types/articleInput.interface'
import { filter, map, Observable } from 'rxjs'
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface'
import { select, Store } from '@ngrx/store'
import { isSubmittingSelector, validationErrorsSelector } from '../../../create-article/store/selectors'
import { ActivatedRoute } from '@angular/router'
import { getArticleAction } from '../../store/actions/get-article.action'
import { articleSelector } from '../../store/selectors'
import { ArticleInterface } from '../../../shared/types/article.interface'
import { updateArticleAction } from '../../store/actions/update-article.action'

@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  initialValues$: Observable<ArticleInputInterface>
  isSubmitting$: Observable<boolean>
  isLoading$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>
  slug: string

  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))

    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      })
    )
  }

  private fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({ articleInput, slug: this.slug }))
  }
}
