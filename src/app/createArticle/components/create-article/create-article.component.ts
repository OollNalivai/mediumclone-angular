import { Component } from '@angular/core';

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  initialValues = {
     title: '1111',
    description: '222',
    body: '1d12c2',
    tagList: ['23123', '222']
  }

  onSubmit(res: any): void {
    console.log('onSubmit in parent', res)
  }

}
