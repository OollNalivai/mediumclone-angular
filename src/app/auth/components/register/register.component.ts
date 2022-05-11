import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store'
import { registerAction } from '../../store/actions/register.action';
import { Observable } from 'rxjs'
import { isSubmittingSelector } from '../../store/selectors'
import { AppStateInterface } from '../../../shared/types/appState.interface'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isSubmitting$: Observable<boolean>

  constructor(private fb: FormBuilder, private store: Store<AppStateInterface>,
              private authService: AuthService) {
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
    console.log(this.isSubmitting$)
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.store.dispatch(registerAction(this.form.value))
    this.authService.register(this.form.value).subscribe((currentUser: CurrentUserInterface) => {
      console.log('current user', currentUser)
    })
  }
}
