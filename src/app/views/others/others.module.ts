import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {OthersRoutingModule} from './others-routing.module';
import {NotFoundComponent, UnauthorizedComponent} from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OthersRoutingModule,
  ],
  declarations: [NotFoundComponent, UnauthorizedComponent]
})
export class OthersModule {
}
