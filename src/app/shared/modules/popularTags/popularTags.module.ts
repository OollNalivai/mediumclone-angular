import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PopularTagsService } from './services/popularTags.service'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'
import { EffectsModule } from '@ngrx/effects'
import { GetPopularTagsEffect } from './store/effects/getPopularTags.effect';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component'
import { LoadingModule } from '../loading/loading.module'
import { ErrorMessageModule } from '../errorMessage/errorMessage.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    RouterModule,
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
