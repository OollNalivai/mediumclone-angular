import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ArticleFormComponent } from './components/article-form/article-form.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ArticleFormComponent],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule {
}
