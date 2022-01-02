import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

@Directive({
    selector: '[appDateFormat]',
    providers: [DatePipe]
})
export class DateFormatDirective implements AfterViewInit {
    @Input() object: Object;
    @Input() dateField: string;
    @Input() userField: string;
    dateTimeFormat;

    constructor(private el: ElementRef, private datePipe: DatePipe) {
        this.dateTimeFormat = 'dd-mm-yyyy';
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.insertAdjacentHTML(
            'beforeend',
            `<span class="text-muted text-small text-capitalize">` + this.isNull(this.object[this.userField]) + `</span>
                        <h6 class="m-0">` + this.isDate(this.object[this.dateField]) + `</h6>`
        );
    }

    isNull(field: string) {
        return field == null ? '' : field;
    }

    isDate(field: string) {
        const date = moment(field);
        return date.isValid() ? this.datePipe.transform(field, this.dateTimeFormat, '+000') : '';
    }
}
