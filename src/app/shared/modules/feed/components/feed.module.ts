import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeedComponent } from './feed/feed.component'
import { EffectsModule } from '@ngrx/effects'
import { GetFeedEffect } from './feed/store/effects/getFeed.effect'
import { StoreModule } from '@ngrx/store'
import { reducers } from './feed/store/reducers'
import { FeedService } from './feed/services/feed.service'

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers)],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})

export class FeedModule {

}
