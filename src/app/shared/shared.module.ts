import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {SharedComponentsModule} from './shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule,
  ],
  providers: [DecimalPipe],
  declarations: []
})
export class SharedModule {
}
