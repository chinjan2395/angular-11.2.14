import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InheritedSnackBarComponent } from './inherited-snack-bar.component';

describe('InheritedSnackBarComponent', () => {
  let component: InheritedSnackBarComponent;
  let fixture: ComponentFixture<InheritedSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InheritedSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InheritedSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
