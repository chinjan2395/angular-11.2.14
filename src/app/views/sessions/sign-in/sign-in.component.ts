import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {SharedAnimations} from '../../../shared/shared-animations/shared-animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocalStoreService} from '../../../shared/shared-services/local-store.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [SharedAnimations]
})
export class SignInComponent implements OnInit {
  prefix = 'SESSION.';
  errorPrefix = this.prefix + 'MESSAGE.ERROR';
  loading: boolean;
  loadingText: string;
  signInForm: FormGroup;
  submitted = false;
  url = '/sessions/sign-in';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private ls: LocalStoreService,
              private snackBar: MatSnackBar) {
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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async signIn(): Promise<any> {
    this.loading = true;
    this.submitted = true;
    this.loadingText = 'Signing in...';
    if (this.signInForm.valid) {
    } else {
      this.loading = false;
    }
  }
}
