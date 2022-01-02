import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgotComponent} from './forgot.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ForgotComponent', () => {
    let component: ForgotComponent;
    let fixture: ComponentFixture<ForgotComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule],
          declarations: [ForgotComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
