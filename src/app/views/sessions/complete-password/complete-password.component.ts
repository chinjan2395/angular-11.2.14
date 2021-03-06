import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../shared/shared-services/validation.service';
import {AmplifyAuthService} from '../../../shared/shared-services/amplify-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-complete-password',
  templateUrl: './complete-password.component.html',
  styleUrls: ['./complete-password.component.scss']
})
export class CompletePasswordComponent {
  loading: boolean;
  loadingText: string;
  form: FormGroup;
  submitted = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data,
              private bottomSheet: MatBottomSheetRef,
              private formBuilder: FormBuilder,
              private router: Router,
              private amplifyAuth: AmplifyAuthService) {
    this.loadingText = 'Set new password';
    this.form = this.formBuilder.group({
      user: [data, Validators.required],
      name: [null, [Validators.required, ValidationService.nameValidator]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        ValidationService.passwordValidator('alphabet-special-character')
      ]]
    });
  }

  async submit(): Promise<any> {
    this.loading = true;
    this.submitted = true;
    this.loadingText = 'Completing new password';
    this.submitted = true;
    if (this.form.valid) {
      const {name, password} = this.form.value;
      this.amplifyAuth.completeNewPassword(this.data, password, {name})
        .then(() => {
          if (this.data) {
            this.bottomSheet.dismiss();
          }
        })
        .catch(error => console.log('CompletePasswordComponent error', error))
        .finally(() => this.loading = false);
    } else {
      this.loading = false;
    }
  }

}
