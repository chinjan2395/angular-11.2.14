import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AmplifyAuthService} from '../../../shared/shared-services/amplify-auth.service';

@Component({
  selector: 'app-complete-sign-up',
  templateUrl: './complete-sign-up.component.html',
  styleUrls: ['./complete-sign-up.component.scss']
})
export class CompleteSignUpComponent {
  loading: boolean;
  loadingText: string;
  submitted = false;
  partialLoading: boolean;
  partialLoadingText = 'Resend confirmation code';
  partialLoadingClass = 'btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text';
  form: FormGroup;
  receivedAuthentication;
  alreadyHasVerificationCode = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data,
              private bottomSheet: MatBottomSheetRef,
              private formBuilder: FormBuilder,
              private amplifyAuth: AmplifyAuthService) {
    if (data?.alreadyHasVerificationCode) {
      this.receivedAuthentication = data?.alreadyHasVerificationCode;
    }
    this.form = this.formBuilder.group({
      username: [data?.other?.username, Validators.required],
      code: [null, [Validators.required]]
    });
  }

  async submit(): Promise<any> {
    this.loading = true;
    this.submitted = true;
    this.loadingText = 'Completing new password';
    this.submitted = true;
    if (this.form.valid) {
      const {username, code, password} = this.form.value;
      this.amplifyAuth.confirmSignUp(username, code, password)
        .then(response => {
          console.log('CompleteSignUpComponent submit response', response);
          this.bottomSheet.dismiss();
        })
        .catch(error => console.log('CompleteSignUpComponent submit error', error))
        .finally(() => this.loading = false);
    } else {
      this.loading = false;
    }
  }

  resendCC(): void {
    if (this.form.get('username').valid) {
      const {username} = this.form.value;
      this.partialLoadingText = 'Sending confirmation code again';
      this.partialLoading = !this.partialLoading;
      this.partialLoadingClass = 'btn-primary btn-rounded btn-block';

      this.amplifyAuth.resendSignUp(username)
        .then(() => {
          this.partialLoadingText = 'Resend confirmation code';
          this.partialLoadingClass = 'btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text';
        })
        .catch(error => console.log('CompleteSignUpComponent resendCC error', error))
        .finally(() => {
          this.loading = false;
          this.partialLoading = false;
        });
    } else {
      this.loading = false;
    }
  }

}
