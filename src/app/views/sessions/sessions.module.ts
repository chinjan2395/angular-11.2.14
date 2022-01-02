import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SessionsRoutingModule} from './sessions-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotComponent} from './forgot/forgot.component';
import {CompletePasswordComponent} from './complete-password/complete-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SessionsRoutingModule
  ],
  declarations: [SignUpComponent, SignInComponent, ForgotComponent, CompletePasswordComponent]
})
export class SessionsModule {
}
