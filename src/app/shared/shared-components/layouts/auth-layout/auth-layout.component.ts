import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {

  constructor(router: Router) {
    router.navigate(['sessions', 'sign-in']).then(() => console.log('navigating to sign in page'));
  }

}
