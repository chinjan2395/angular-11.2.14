import {NgModule} from '@angular/core';
import {SearchComponent} from './search.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
// import {NgxPaginationModule} from 'ngx-pagination';
// import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        // NgxPaginationModule,
        // PerfectScrollbarModule
    ],
    declarations: [SearchComponent],
    exports: [SearchComponent]
})
export class SearchModule {

}
