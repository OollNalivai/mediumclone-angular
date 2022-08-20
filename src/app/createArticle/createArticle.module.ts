import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateArticleComponent } from './components/create-article/create-article.component'
import { RouterModule } from '@angular/router'
import { ArticleFormModule } from '../shared/modules/articleForm/articleForm.module'
import { CreateArticleService } from './services/createArticle.service'
import { EffectsModule } from '@ngrx/effects'
import { CreateArticleAffect } from './store/effects/createArticle.affect'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent
  }
]

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleAffect]),
    StoreModule.forFeature('createArticle', reducers)
  ],
  declarations: [
    CreateArticleComponent
  ],
  providers: [CreateArticleService]
})

export class CreateArticleModule {

}
