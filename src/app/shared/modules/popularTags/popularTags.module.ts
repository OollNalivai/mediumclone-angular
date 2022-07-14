import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PopularTagsService } from './services/popularTags.service'

@NgModule({
  imports: [CommonModule],
  providers: [PopularTagsService]
})

export class PopularTagsModule {

}
