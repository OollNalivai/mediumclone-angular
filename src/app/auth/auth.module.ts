import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store'
import { authReducer } from './store/reducers'
import { AuthService } from './services/auth.service'
import { EffectsModule } from '@ngrx/effects'
import { RegisterEffect } from './store/effects/register.effect'
import { LoginEffect } from './store/effects/login.effect'
import { BackendErrorMessagesModule } from '../shared/modules/backend-error-messages/backend-error-messages.module'
import { PersistenceService } from '../shared/services/persistence.service';
import { LoginComponent } from './components/login/login.component'
import { GetCurrentUserEffect } from './store/effects/get-current-user.effect'
import { UpdateCurrentUserEffect } from './store/effects/update-current-user.effect'
import { LogoutEffect } from './store/effects/logout.effect'


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect, UpdateCurrentUserEffect, LogoutEffect]),
    BackendErrorMessagesModule
  ],
  providers: [
    AuthService,
    PersistenceService
  ]
})
export class AuthModule {
}
