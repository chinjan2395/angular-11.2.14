import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

export enum Theme {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'danger'
}

@Component({
  selector: 'app-inherited-snack-bar',
  templateUrl: './inherited-snack-bar.component.html',
  styleUrls: ['./inherited-snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InheritedSnackBarComponent {
  public theme: Theme.SUCCESS;
  public message;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.theme = data?.theme;
    this.message = data?.message;
  }

}
