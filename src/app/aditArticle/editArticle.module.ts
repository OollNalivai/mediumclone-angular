import { NgModule } from '@angular/core'
import { EditArticleService } from './services/editArticle.service'
import { ArticleService as SharedArticleService } from '../shared/services/article.service'


@NgModule({
  providers: [
    EditArticleService,
    SharedArticleService
  ]
})

export class EditArticleModule {
}
