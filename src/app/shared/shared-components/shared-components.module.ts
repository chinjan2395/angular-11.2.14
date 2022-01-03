import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ErrorMessageComponent} from './error-message/error-message.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {BlankLayoutComponent} from './layouts/blank-layout/blank-layout.component';
import {BtnLoadingComponent} from './btn-loading/btn-loading.component';
import {InheritedSnackBarComponent} from './inherited-snack-bar/inherited-snack-bar.component';

const components = [
  ErrorMessageComponent,
  AuthLayoutComponent,
  AdminLayoutComponent,
  BlankLayoutComponent,
  BtnLoadingComponent,
  InheritedSnackBarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  declarations: components,
  exports: components,
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        // duration: 2500,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      }
    }
  ]
})
export class SharedComponentsModule {
}
