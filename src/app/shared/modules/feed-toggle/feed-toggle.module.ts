import { NgModule } from '@angular/core'
import { FeedToggleComponent } from './components/feed-toggler/feed-toggle.component'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FeedToggleComponent],
  exports: [FeedToggleComponent]
})

export class FeedToggleModule {

}
