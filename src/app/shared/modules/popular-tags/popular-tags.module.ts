import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PopularTagsService } from './services/popular-tags.service'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'
import { EffectsModule } from '@ngrx/effects'
import { GetPopularTagsEffect } from './store/effects/get-popular-tags.effect';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component'
import { LoadingModule } from '../loading/loading.module'
import { ErrorMessageModule } from '../error-message/error-message.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    LoadingModule,
    ErrorMessageModule
  ],
  providers: [PopularTagsService],
  declarations: [
    PopularTagsComponent
  ],
  exports: [
    PopularTagsComponent
  ]

})

export class PopularTagsModule {

}
