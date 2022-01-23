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
import {MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {HeaderSidebarCompactComponent} from './layouts/admin-layout/header-sidebar-compact/header-sidebar-compact.component';
import {SidebarCompactComponent} from './layouts/admin-layout/sidebar-compact/sidebar-compact.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {SharedPipesModule} from '../shared-pipes/shared-pipes.module';
import {SearchModule} from './search/search.module';
import {SharedDirectivesModule} from '../shared-directives/shared-directives.module';

const components = [
  ErrorMessageComponent,
  AuthLayoutComponent,
  AdminLayoutComponent,
  BlankLayoutComponent,
  BtnLoadingComponent,
  InheritedSnackBarComponent,
  HeaderSidebarCompactComponent,
  SidebarCompactComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    NgbDropdownModule,
    PerfectScrollbarModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SearchModule
  ],
  declarations: components,
  exports: components,
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 2500,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      }
    },
    {
      provide: MatBottomSheetRef, useValue: {}
    },
  ]
})
export class SharedComponentsModule {
}
