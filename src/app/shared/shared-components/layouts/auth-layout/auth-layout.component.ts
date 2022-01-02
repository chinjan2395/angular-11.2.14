import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {

  constructor(private router: Router) {
    this.navigate().then();
  }

  async navigate(): Promise<any> {
    await this.router.navigate(['sessions', 'sign-in']);
  }

}
