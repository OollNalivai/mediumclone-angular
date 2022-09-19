import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { RouterModule } from '@angular/router'
import { UserProfileService } from './services/userProfile.service'

const routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    UserProfileComponent
  ],
  providers: [UserProfileService]
})

export class UserProfileModule {

}
