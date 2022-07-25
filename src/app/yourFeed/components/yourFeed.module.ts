import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { YourFeedComponent } from './your-feed/your-feed.component'
import { FeedModule } from '../../shared/modules/feed/components/feed.module'
import { BannerModule } from '../../shared/modules/banner/banner.module'
import { PopularTagsModule } from '../../shared/modules/popularTags/popularTags.module'
import { FeedToggleModule } from '../../shared/modules/feedToggle/feedToggle.module'


const routes = [
  {
    path: 'feed',
    component: YourFeedComponent
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
  declarations: [YourFeedComponent]
})

export class YourFeedModule {

}
