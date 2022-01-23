import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {SharedComponentsModule} from './shared-components/shared-components.module';
import {SharedDirectivesModule} from './shared-directives/shared-directives.module';
import {SharedPipesModule} from './shared-pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule
  ],
  exports: [
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule
  ],
  providers: [DecimalPipe],
  declarations: []
})
export class SharedModule {
}
