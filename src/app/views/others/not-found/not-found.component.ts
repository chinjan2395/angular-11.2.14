import {Component} from '@angular/core';
import * as Sentry from '@sentry/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private activatedRoute: ActivatedRoute) {
    Sentry.captureMessage('User visited page which does not exist');
  }
}

@Component({
  selector: 'app-unauthorized',
  template: '<div class="not-found-wrap text-center">' +
    '    <h1 class="text-60">401</h1>' +
    '    <p class="text-36 subheading mb-3">Unauthorized!</p>' +
    '    <p class="mb-5  text-muted text-18">Look like you are trying to access <strong>Unauthorized</strong> page.</p>' +
    '    <button class="btn btn-lg btn-primary btn-rounded" routerLink="/">Go back to home</button>' +
    '</div>'
})
export class UnauthorizedComponent {

  constructor() {
  }
}
