import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent, UnauthorizedComponent} from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '401',
    component: UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule {
}
