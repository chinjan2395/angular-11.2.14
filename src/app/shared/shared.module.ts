import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {SharedComponentsModule} from './shared-components/shared-components.module';
import {SharedDirectivesModule} from './shared-directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedDirectivesModule
  ],
  exports: [
    SharedComponentsModule,
    SharedDirectivesModule
  ],
  providers: [DecimalPipe],
  declarations: []
})
export class SharedModule {
}
