import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PopularTagsService } from './services/popularTags.service'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'
import { EffectsModule } from '@ngrx/effects'
import { GetPopularTagsEffect } from './store/effects/getPopularTags.effect'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect])],
  providers: [PopularTagsService]

})

export class PopularTagsModule {

}
