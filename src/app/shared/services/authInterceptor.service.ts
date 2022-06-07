import { Injectable } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // req = request.clone({
    //
    // })
    return undefined;
  }




}
