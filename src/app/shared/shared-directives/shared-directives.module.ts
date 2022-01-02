import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarContainerDirective, SidebarContentDirective, SidebarDirective, SidebarTogglerDirective} from './sidebar.directive';
import {DateFormatDirective} from './date-format.directive';
import {EmptyDirective} from './empty.directive';
import {LabelValidationDirective} from './label-validation.directive';
import {ShowPasswordDirective} from './show-password.directive';

const directives = [
  SidebarDirective,
  SidebarContainerDirective,
  SidebarContentDirective,
  SidebarTogglerDirective,
  DateFormatDirective,
  EmptyDirective,
  LabelValidationDirective,
  ShowPasswordDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule {
}
