import { NgModule } from '@angular/core'
import { EditArticleService } from './services/editArticle.service'
import { ArticleService as SharedArticleService } from '../shared/services/article.service'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { GetArticleEffect } from './store/effects/getArticle.effect'
import { UpdateArticleEffect } from './store/effects/updateArticle.effect'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', reducers)
  ],
  declarations: [

  ],
  providers: [
    EditArticleService,
    SharedArticleService
  ]
})

export class EditArticleModule {
}
