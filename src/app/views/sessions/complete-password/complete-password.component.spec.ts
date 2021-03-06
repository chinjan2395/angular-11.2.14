import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CompletePasswordComponent} from './complete-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../shared/shared.module';

describe('CompletePasswordComponent', () => {
  let component: CompletePasswordComponent;
  let fixture: ComponentFixture<CompletePasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule, SharedModule],
      declarations: [CompletePasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
