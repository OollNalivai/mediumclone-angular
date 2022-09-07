import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { filter, Observable, Subscription } from 'rxjs'
import { currentUserSelector } from '../../../auth/store/selectors'
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface'
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors'
import { CurrentUserInputInterface } from '../../../shared/types/currentUserInput.interface'
import { updateCurrentUserAction } from '../../../auth/store/actions/updateCurrentUser.action'

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  currentUser: CurrentUserInterface
  currentUserSubscription: Subscription
  form: FormGroup
  isSubmitting$: Observable<Boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  initializeForm() {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    })
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    }
    this.store.dispatch(updateCurrentUserAction({currentUserInput}))
  }

  logout(): void {

  }
}
