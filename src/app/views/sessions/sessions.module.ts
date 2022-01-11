import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SessionsRoutingModule} from './sessions-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotComponent} from './forgot/forgot.component';
import {CompletePasswordComponent} from './complete-password/complete-password.component';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {CompleteSignUpComponent} from './complete-sign-up/complete-sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SessionsRoutingModule
  ],
  declarations: [SignUpComponent, SignInComponent, ForgotComponent, CompletePasswordComponent, CompleteSignUpComponent],
  providers: [
    {
      provide: MAT_BOTTOM_SHEET_DATA, useValue: {}
    }
  ]
})
export class SessionsModule {
}
