import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent} from './error-message/error-message.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {BlankLayoutComponent} from './layouts/blank-layout/blank-layout.component';

const components = [
  ErrorMessageComponent,
  AuthLayoutComponent,
  AdminLayoutComponent,
  BlankLayoutComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: components,
  exports: components,
})
export class SharedComponentsModule {
}
