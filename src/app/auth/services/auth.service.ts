import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RegisterRequestInterface } from '../types/register-request.interface'
import { map, Observable } from 'rxjs'
import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { environment } from '../../../environments/environment'
import { AuthResponseInterface } from '../types/auth-response.interface'
import { LoginRequestInterface } from '../types/login-request.interface'
import { CurrentUserInputInterface } from '../../shared/types/current-userInput.interface'

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {
  }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'

    return this.http.post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login'

    return this.http.post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'

    return this.http.get(url)
      .pipe(map(this.getUser))
  }

  updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http.put(url, { user: currentUserInput }).pipe(map(this.getUser))

  }
}
