import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {SharedAnimations} from '../../../shared/shared-animations/shared-animations';
import {ValidationService} from '../../../shared/shared-services/validation.service';
import {AmplifyAuthService} from '../../../shared/shared-services/amplify-auth.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CompletePasswordComponent} from '../complete-password/complete-password.component';

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
  url = '/sessions/sign-in';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private amplifyAuth: AmplifyAuthService,
              private bottomSheet: MatBottomSheet) {
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
      username: ['admin', [
        Validators.required,
        Validators.minLength(4),
      ]],
      password: ['mk@Aibml23', [
        Validators.required,
        Validators.minLength(8),
        ValidationService.passwordValidator('alphabet-special-character')
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
          this.bottomSheet.open(CompletePasswordComponent, {
            ariaLabel: 'Share on social media',
            data: response
          });
        })
        .catch(error => {
          console.log('SignInComponent error', error);
        })
        .finally(() => this.loading = false);
    } else {
      this.loading = false;
    }
  }
}
