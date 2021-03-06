import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AuthLayoutComponent} from './auth-layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {SignInComponent} from '../../../../views/sessions/sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SignUpComponent} from '../../../../views/sessions/sign-up/sign-up.component';
import {ForgotComponent} from '../../../../views/sessions/forgot/forgot.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

fdescribe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'sessions/sign-in',
            component: SignInComponent
          },
          {
            path: 'sessions/sign-up',
            component: SignUpComponent
          },
          {
            path: 'sessions/forgot',
            component: ForgotComponent
          }
        ]),
        ReactiveFormsModule,
        MatSnackBarModule,
        MatBottomSheetModule
      ],
      declarations: [AuthLayoutComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigate();
    expect(navigateSpy).toHaveBeenCalledWith(['sessions', 'sign-in']);
  });
});
