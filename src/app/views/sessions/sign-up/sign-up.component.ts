import {Component} from '@angular/core';
import {SharedAnimations} from '../../../shared/shared-animations/shared-animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AmplifyAuthService} from '../../../shared/shared-services/amplify-auth.service';
import {ValidationService} from '../../../shared/shared-services/validation.service';
import {ISignUpResult} from 'amazon-cognito-identity-js';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CompleteSignUpComponent} from '../complete-sign-up/complete-sign-up.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [SharedAnimations]
})
export class SignUpComponent {
  loading: boolean;
  loadingText: string;
  partialLoading: boolean;
  partialLoadingText = 'Sign In';
  partialLoadingClass = 'btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text';
  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private amplifyAuth: AmplifyAuthService,
              private bottomSheet: MatBottomSheet) {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        ValidationService.nameValidator
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      username: ['', [
        Validators.required,
        ValidationService.usernameValidator,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        ValidationService.passwordValidator('alphabet-special-character')
      ]],
      rePassword: ['', [
        Validators.required
      ]]
    }, {
      validator: ValidationService.validateAreEqual('rePassword', 'password')
    });
  }

  async submit(): Promise<any> {
    this.loading = true;
    this.submitted = true;
    this.loadingText = 'Signing up...';
    if (this.form.valid) {
      const {username, password, email, name} = this.form.value;
      this.amplifyAuth.signUp(username, password, {email, name})
        .then((response: ISignUpResult) => {
          if (response.codeDeliveryDetails) {
            const customResponse = {
              user: response.user,
              CodeDeliveryDetails: response.codeDeliveryDetails
            };
            const bottomSheet = this.bottomSheet.open(CompleteSignUpComponent, {
              data: {
                other: {
                  username
                },
                alreadyHasVerificationCode: customResponse
              }
            });
            bottomSheet.afterDismissed().subscribe(() => {
              this.router.navigate(['/', 'sessions', 'sign-in']);
            });
          }
        })
        .catch(error => {
          if (error.code === 'UsernameExistsException') {
            this.partialLoadingText = 'Try Signing in';
            this.partialLoading = !this.partialLoading;
            this.partialLoadingClass = 'btn-primary btn-rounded btn-block';
            setTimeout(() => {
              this.partialLoadingText = 'Sign In';
              this.partialLoadingClass = 'btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text';
            }, 2000);
          }
        })
        .finally(() => {
          this.loading = false;
          this.partialLoading = false;
        });
    } else {
      this.loading = false;
    }
  }

}
