import { NgModule } from '@angular/core'
import { EditArticleService } from './services/edit-article.service'
import { ArticleService as SharedArticleService } from '../shared/services/article.service'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { GetArticleEffect } from './store/effects/get-article.effect'
import { UpdateArticleEffect } from './store/effects/update-article.effect'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'
import { LoadingModule } from '../shared/modules/loading/loading.module'
import { EditArticleComponent } from './components/edit-article/edit-article.component'
import { RouterModule } from '@angular/router'
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module'

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule
  ],
  declarations: [
    EditArticleComponent
  ],
  providers: [
    EditArticleService,
    SharedArticleService
  ]
})

export class EditArticleModule {
}
