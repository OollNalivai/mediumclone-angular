import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store'
import { registerAction } from '../../store/actions/register.action';
import { Observable } from 'rxjs'
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors'
import { AppStateInterface } from '../../../shared/types/appState.interface'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  initForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: ''
    });
  }

  initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    console.log(this.isSubmitting$, this.backendErrors$)
  }

  onSubmit(): void {
    console.log(this.form.value);
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }
}
