import { NgModule } from '@angular/core'
import { FeedToggleComponent } from './components/feed-toggler/feed-toggle.component'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [CommonModule],
  declarations: [FeedToggleComponent],
  exports: [FeedToggleComponent]
})

export class FeedToggleModule {

}
