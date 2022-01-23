import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardV2Component} from './dashboard-v2/dashboard-v2.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardV2Component,
    data: {
      icon: 'nav-icon i-Bar-Chart',
      status: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
