import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appEmpty]'
})
export class EmptyDirective implements AfterViewInit {
  @Input() emptyValue = '&nbsp;';

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const field = this.el.nativeElement.innerHTML;
      const isEmpty = this.isNull(field);
      const innerHTML = isEmpty == this.emptyValue ? `<span class="text-black-50">` + isEmpty + `</span>` : '';
      this.el.nativeElement.insertAdjacentHTML('beforeend', innerHTML);
    }, 1450);
  }

  isNull(field: string) {
    return field == null ? this.emptyValue : this.isBlank(field);
  }

  isBlank(field: string) {
    return field == '' ? this.emptyValue : field;
  }
}
