import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {ExcerptPipe} from './excerpt.pipe';
import {RelativeTimePipe} from './relative-time.pipe';
import {SanitizeHtmlPipe} from './sanitizeHtml';

const pipes = [
    ExcerptPipe,
    RelativeTimePipe,
    SanitizeHtmlPipe
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: pipes,
    exports: pipes,
    providers: [
        DecimalPipe
    ]
})
export class SharedPipesModule {
}
