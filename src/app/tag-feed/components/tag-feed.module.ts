import { NgModule } from '@angular/core'
import { TagFeedComponent } from './tag-feed/tag-feed.component'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FeedModule } from '../../shared/modules/feed/feed.module'
import { BannerModule } from '../../shared/modules/banner/banner.module'
import { PopularTagsModule } from '../../shared/modules/popular-tags/popular-tags.module'
import { FeedToggleModule } from '../../shared/modules/feed-toggle/feed-toggle.module'

const routes = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedToggleModule
  ],
  declarations: [TagFeedComponent]
})

export class TagFeedModule {

}
