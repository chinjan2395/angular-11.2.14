import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotComponent} from './forgot/forgot.component';
import {CompleteSignUpComponent} from './complete-sign-up/complete-sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'complete-sign-up',
    component: CompleteSignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsRoutingModule {
}
