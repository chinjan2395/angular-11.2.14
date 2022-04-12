import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      breadcrumb: $localize`:@@app.menu.users:`,
      icon: 'nav-icon i-Checked-User',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
