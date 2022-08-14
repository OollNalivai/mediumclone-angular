import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface'
import { ArticleInputInterface } from '../../../../types/articleInput.interface'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'mc-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  @Input('initialValues') initialValuesProps: ArticleInputInterface
  @Input('isSubmitting') isSubmittingProps: boolean
  @Input('errors') errorsProps: BackendErrorsInterface | null

  @Output('articleSubmit') articleSubmitEvent = new EventEmitter<ArticleInputInterface>()

  form: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      title: '',
      description: '',
      body: '',
      tagList: ''
    })
  }

  onSubmit(): void {
    this.articleSubmitEvent.emit(this.form.value)
  }
}
