import {Component, Input} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'btn-loading',
  templateUrl: './btn-loading.component.html',
  styleUrls: ['./btn-loading.component.scss']
})
export class BtnLoadingComponent {
  @Input() loading: boolean;
  @Input() btnClass: string;
  @Input() loadingText = 'Please wait';
  @Input() type: 'button' | 'submit' = 'submit';

  constructor() {
  }

}
