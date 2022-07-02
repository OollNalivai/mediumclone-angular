import { NgModule } from '@angular/core'
import { ErrorMessageComponent } from './components/error-message/error-message.component'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorMessageComponent],
  exports: [ErrorMessageComponent]
})

export class ErrorMessageModule {

}
