import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SignInComponent} from './sign-in.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../shared/shared.module';
import {Router} from '@angular/router';

fdescribe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule, SharedModule],
      declarations: [SignInComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should declare variables', () => {
    expect(component.loading).toBeUndefined();
    expect(component.loadingText).toBeUndefined();
    expect(component.signInForm).toBeInstanceOf(FormGroup);
    expect(component.submitted).toBeFalse();
    expect(component.url).toBe('/sessions/sign-in');
  });

  it('should initialize form group', () => {
    expect(component.signInForm.get('username')).toBeInstanceOf(FormControl);
    expect(component.signInForm.get('password')).toBeInstanceOf(FormControl);
  });

  it('should validate success', () => {
    component.signInForm.patchValue({
      username: 'Chinjan',
      password: 'Chinjan@'
    });
    expect(component.signInForm.valid).toBeTrue();
  });

  it('should validate failure', () => {
    component.signInForm.patchValue({
      username: '',
      password: ''
    });
    expect(component.signInForm.valid).toBeFalse();

    component.signInForm.patchValue({
      username: 'chinjan',
      password: 'chinjan'
    });
    expect(component.signInForm.valid).toBeFalse();

    component.signInForm.patchValue({
      username: 'john-doe',
      password: 'test'
    });
    expect(component.signInForm.valid).toBeFalse();
  });
});
