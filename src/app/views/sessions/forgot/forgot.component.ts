import {Component, Inject} from '@angular/core';
import {SharedAnimations} from '../../../shared/shared-animations/shared-animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../shared/shared-services/validation.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {AmplifyAuthService} from '../../../shared/shared-services/amplify-auth.service';
import {Router} from '@angular/router';
import {InheritedSnackBarComponent, Theme} from '../../../shared/shared-components/inherited-snack-bar/inherited-snack-bar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: [SharedAnimations]
})
export class ForgotComponent {
  loading: boolean;
  loadingText: string;
  initialForm: FormGroup;
  form: FormGroup;
  initialSubmitted = false;
  submitted = false;
  receivedAuthentication;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data,
              private formBuilder: FormBuilder,
              private amplifyAuth: AmplifyAuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    console.log('data', data);
    this.loadingText = 'Forgot password';
    this.initialForm = this.formBuilder.group({
      username: [data?.other?.username, [Validators.required]]
    });
    this.form = this.formBuilder.group({
      username: [data?.other?.username, Validators.required],
      code: [null, [Validators.required, ValidationService.numberValidator]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        ValidationService.passwordValidator('alphabet-special-character')
      ]]
    });
  }

  async initialSubmit(): Promise<any> {
    this.loading = true;
    this.loadingText = 'Requesting confirmation code';
    if (this.initialForm.valid) {
      const {username} = this.initialForm.value;
      this.amplifyAuth.forgotPassword(username)
        .then(response => {
          console.log('Initial forgotPassword response', response);
          this.receivedAuthentication = response;
          this.loadingText = 'Requesting confirmation code';
          this.initialSubmitted = true;
          this.form.get('username').setValue(username);
        })
        .catch(error => {
          console.log('Initial forgotPassword error', error);
          if (error.code === 'NotAuthorizedException') {
            this.router.navigate(['/', 'sessions', 'sign-in'])
              .then(() => {
                this.snackBar.openFromComponent(InheritedSnackBarComponent, {
                  data: {
                    message: 'Please try login before resetting password for the first time',
                    theme: Theme.INFO
                  }
                });
              });
          }
        })
        .finally(() => this.loading = false);
    } else {
      this.loading = false;
    }
  }

  async submit(): Promise<any> {
    this.loading = true;
    this.submitted = true;
    this.loadingText = 'Completing new password';
    this.submitted = true;
    if (this.form.valid) {
      const {username, code, password} = this.form.value;
      this.amplifyAuth.forgotPasswordSubmit(username, code, password)
        .then(response => {
          console.log('forgotPasswordSubmit submit response', response);
          this.router.navigate(['/', 'sessions', 'sign-in']);
        })
        .catch(error => console.log('forgotPasswordSubmit error', error))
        .finally(() => this.loading = false);
    } else {
      this.loading = false;
    }
  }

}
