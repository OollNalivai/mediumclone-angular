import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface'
import { select, Store } from '@ngrx/store'
import { AppStateInterface } from '../../../shared/types/app-state.interface'
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors'
import { LoginRequestInterface } from '../../types/login-request.interface'
import { loginAction } from '../../store/actions/login.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSubmit(): void {
    console.log(this.form.value);
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
  }

}
