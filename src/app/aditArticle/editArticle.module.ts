import { NgModule } from '@angular/core'
import { EditArticleService } from './services/editArticle.service'
import { ArticleService as SharedArticleService } from '../shared/services/article.service'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { GetArticleEffect } from './store/effects/getArticle.effect'
import { UpdateArticleEffect } from './store/effects/updateArticle.effect'

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
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
