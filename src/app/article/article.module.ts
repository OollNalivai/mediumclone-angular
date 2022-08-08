import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'
import { RouterModule } from '@angular/router'
import { ErrorMessageModule } from '../shared/modules/errorMessage/errorMessage.module'
import { LoadingModule } from '../shared/modules/loading/loading.module'
import { ArticleService as SharedArticleService } from '../shared/services/article.service'
import { GetArticleEffect } from './store/effects/getArticle.effect'
import { ArticleComponent } from './components/article/article.component'
import { TagListModule } from '../shared/modules/tagList/tagList.module'
import { ArticleService } from './services/article.service'

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    TagListModule
  ],
  declarations: [
    ArticleComponent
  ],
  providers: [SharedArticleService, ArticleService]
})

export class ArticleModule {

}
