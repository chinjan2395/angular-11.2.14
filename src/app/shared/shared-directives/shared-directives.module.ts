import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarContainerDirective, SidebarContentDirective, SidebarDirective, SidebarTogglerDirective} from './sidebar.directive';
import {DateFormatDirective} from './date-format.directive';
import {EmptyDirective} from './empty.directive';
import {LabelValidationDirective} from './label-validation.directive';
import {ShowPasswordDirective} from './show-password.directive';
import {AppDropdownDirective} from './dropdown.directive';
import {FullScreenWindowDirective} from './full-screen.directive';
import {DropdownLinkDirective} from './dropdown-link.directive';
import {DropdownAnchorDirective} from './dropdown-anchor.directive';

const directives = [
  SidebarDirective,
  SidebarContainerDirective,
  SidebarContentDirective,
  SidebarTogglerDirective,
  DateFormatDirective,
  EmptyDirective,
  LabelValidationDirective,
  ShowPasswordDirective,
  AppDropdownDirective,
  DropdownLinkDirective,
  DropdownAnchorDirective,
  FullScreenWindowDirective
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
