import { Component, Input } from '@angular/core'

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {

  @Input('tags') tags: string[];

}
