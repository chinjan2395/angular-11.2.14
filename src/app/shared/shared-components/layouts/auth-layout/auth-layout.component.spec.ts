import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthLayoutComponent} from './auth-layout.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(waitForAsync () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthLayoutComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
