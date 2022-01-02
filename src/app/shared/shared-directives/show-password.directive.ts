import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appShowPassword]'
})
export class ShowPasswordDirective {
  private shown = false;

  constructor(private element: ElementRef) {
    this.setup();
  }

  setup(): void {
    const parent = this.element.nativeElement.parentNode;
    setTimeout(() => {
      const span = parent.querySelector('.input-group-append .input-group-text');
      span.setAttribute('style', `cursor:pointer`);
      span.addEventListener('click', () => this.toggle(span));
    }, 550);
  }

  toggle(span: HTMLElement): void {
    this.shown = !this.shown;
    if (this.shown) {
      this.element.nativeElement.setAttribute('type', 'text');
      span.innerHTML = '<i class="fa fa-eye"></i>';
    } else {
      this.element.nativeElement.setAttribute('type', 'password');
      span.innerHTML = '<i class="fa fa-eye-slash"></i>';
    }
  }

}
