import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {SharedAnimations} from '../../../shared/shared-animations/shared-animations';
import {AmplifyAuthService} from '../../../shared/shared-services/amplify-auth.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CompletePasswordComponent} from '../complete-password/complete-password.component';
import {ForgotComponent} from '../forgot/forgot.component';
import {LocalStoreService} from '../../../shared/shared-services/local-store.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [SharedAnimations]
})
export class SignInComponent implements OnInit {
  loading: boolean;
  loadingText: string;
  signInForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private amplifyAuth: AmplifyAuthService,
              private ls: LocalStoreService,
              private bottomSheet: MatBottomSheet) {
    const username = this.ls.getItem('username');
    if (username !== null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.loadingText = 'Loading Dashboard Module...';
        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    this.signInForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  async signIn(): Promise<any> {
    this.loading = true;
    this.submitted = true;
    this.loadingText = 'Signing in...';
    if (this.signInForm.valid) {
      const {username, password} = this.signInForm.value;
      this.amplifyAuth.signIn(username, password)
        .then(response => {
          console.log('SignInComponent response', response);
          if (!response?.challengeName) {
            this.setSession(response);
          } else {
            this.bottomSheet.open(CompletePasswordComponent, {
              data: response
            });
          }
        })
        .catch(error => {
          console.log('SignInComponent error', error);
          if (error.code === 'PasswordResetRequiredException') {
            this.bottomSheet.open(ForgotComponent, {
              ariaLabel: error.message,
              data: error
            });
          }
        })
        .finally(() => this.loading = false);
    } else {
      this.loading = false;
    }
  }

 async setSession(response): Promise<any> {
    response.getUserData((error, getUserData) => {
      const userAttributes = getUserData.UserAttributes;
      userAttributes.map((UserAttributes, index) => {
        this.ls.setItem(UserAttributes.Name, UserAttributes.Value);
      });
    });
    response.getSession((error, getSession) => {
      this.ls.setItem('idToken', getSession.getIdToken());
      this.ls.setItem('refreshToken', getSession.getRefreshToken());
      this.ls.setItem('accessToken', getSession.getAccessToken());
    });
    this.ls.setItem('username', response.getUsername());
    await this.router.navigate(['/']);
  }
}
