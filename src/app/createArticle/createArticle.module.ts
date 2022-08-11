import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateArticleComponent } from './components/create-article/create-article.component'
import { RouterModule } from '@angular/router'

const routes = [
  {
    path: 'article/new',
    component: CreateArticleComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    CreateArticleComponent
  ]
})

export class CreateArticleModule {

}
