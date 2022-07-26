import { NgModule } from '@angular/core'
import { TagFeedComponent } from './tag-feed/tag-feed.component'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FeedModule } from '../../shared/modules/feed/components/feed.module'
import { BannerModule } from '../../shared/modules/banner/banner.module'
import { PopularTagsModule } from '../../shared/modules/popularTags/popularTags.module'
import { FeedToggleModule } from '../../shared/modules/feedToggle/feedToggle.module'

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
