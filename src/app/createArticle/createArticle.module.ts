import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateArticleComponent } from './components/create-article/create-article.component'
import { RouterModule } from '@angular/router'
import { ArticleFormModule } from '../shared/modules/articleForm/articleForm.module'
import { CreateArticleService } from './services/createArticle.service'
import { EffectsModule } from '@ngrx/effects'
import { CreateArticleAffect } from './store/effects/createArticle.affect'

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ArticleFormModule, ArticleFormModule, EffectsModule.forFeature([CreateArticleAffect])],
  declarations: [
    CreateArticleComponent
  ],
  providers: [CreateArticleService]
})

export class CreateArticleModule {

}
