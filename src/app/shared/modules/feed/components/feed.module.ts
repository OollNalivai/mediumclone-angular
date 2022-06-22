import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeedComponent } from './feed/feed.component'
import { EffectsModule } from '@ngrx/effects'
import { GetFeedEffect } from './feed/store/effects/getFeed.effect'

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GetFeedEffect])],
  declarations: [FeedComponent],
  exports: [FeedComponent]
})

export class FeedModule {

}
