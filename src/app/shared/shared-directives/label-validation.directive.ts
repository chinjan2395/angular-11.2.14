import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Directive({
    selector: '[appLabelValidation]'
})
export class LabelValidationDirective implements AfterViewInit {
    private readonly defaultLanguage = 'en';
    private title = {
        'not-required': {en: '', cn: ''},
        'required': {en: ' *', cn: ' *'},
        'min': {en: ' (Minimum _unit_ units)', cn: ' (最低限度 _unit_ 碼)'},
        'required-min': {en: ' *(Minimum _unit_ units)', cn: ' *(最低限度 _unit_ 碼)'},
        'max': {en: ' (Maximum _unit_ units)', cn: ' (最大值 _unit_ 碼)'},
        'required-max': {en: ' *(Maximum _unit_ units)', cn: ' *(最大值 _unit_ 碼)'},
        'min-max': {en: ' (_min-unit_ ~ _max-unit_ units)', cn: ' (_min-unit_ ~ _max-unit_ 碼)'},
        'required-min-max': {en: ' *(_min-unit_ ~ _max-unit_ units)', cn: ' *(_min-unit_ ~ _max-unit_ 碼)'},
    };
    @Input() control: FormControl;
    @Input() lang: string;
    @Input() label: string;
    @Input() showMinMax = true;
    hasRequired = false;
    hasEmail = false;
    hasMinLength = false;
    hasMaxLength = false;
    minLength = 0;
    maxLength = 0;

    constructor(private _el: ElementRef, private renderer: Renderer2) {
        this.defaultLanguage = 'en';
    }

    ngAfterViewInit(): void {
        this.hasValidator();
        /*setTimeout(() => {
            this.getTranslatedLabel(this.lang + this.label.toUpperCase()).then((translatedLabel: string) => {
                let innerHTML = '';
                this.renderer.setProperty(this._el.nativeElement, 'innerHTML', translatedLabel);
                if (this.hasRequired && this.hasMinLength && this.hasMaxLength) {
                    innerHTML = this.getStaticTranslatedLabel('required-min-max', this.minLength, this.maxLength);
                } else if (this.hasRequired && this.hasMinLength) {
                    innerHTML = this.getStaticTranslatedLabel('required-min', this.minLength);
                } else if (this.hasRequired && this.hasMaxLength) {
                    innerHTML = this.getStaticTranslatedLabel('required-max', null, this.maxLength);
                } else if (this.hasRequired) {
                    innerHTML = this.getStaticTranslatedLabel('required');
                } else if (this.hasMinLength) {
                    innerHTML = this.getStaticTranslatedLabel('min', this.minLength);
                } else if (this.hasMaxLength) {
                    innerHTML = this.getStaticTranslatedLabel('max', null, this.maxLength);
                } else if (!this.hasRequired) {
                    innerHTML = this.getStaticTranslatedLabel('not-required');
                }
                this._el.nativeElement.insertAdjacentHTML('beforeend', '<span class="text-sm">' + innerHTML + '</span>');
            });
        }, 55);*/
    }

    getTranslatedLabel(field: string) {
        /*return new Promise((resolve: any) => {
            this.translate.get(field).toPromise().then((data: string) => resolve(data));
        });*/
    }

    getStaticTranslatedLabel(field: string, min: number = null, max: number = null) {
        let string = this.title[field][this.defaultLanguage];
        switch (field) {
            case 'min':
                string = string.replace('_unit_', min);
                break;
            case 'max':
                string = string.replace('_unit_', max);
                break;
            case 'required-min':
                string = string.replace('_unit_', min);
                break;
            case 'required-max':
                string = string.replace('_unit_', max);
                break;
            case 'required-min-max':
                string = string.replace('_min-unit_', min).replace('_max-unit_', max);
                break;
        }
        return string;
    }

    getControlName(c: AbstractControl): string | null {
        const formGroup = c.parent.controls;
        return Object.keys(formGroup).find((name: any) => c === formGroup[name]).replace('_', '-').toUpperCase() || null;
    }

    hasValidator() {
        const lastValue: any = this.control.value;
        const validators = ['required', 'pattern', 'minlength', 'maxlength', 'email'];
        validators.forEach((validator: string) => {
            this.control.setValue('');
            switch (validator) {
                case 'required':
                    this.control.setValue('');
                    this.hasRequired = this.control.errors != null ? this.control.errors.required == true : false;
                    break;
                case 'minlength':
                    this.control.setValue('0');
                    this.hasMinLength = this.control.errors != null ? this.control.errors['minlength'] != undefined : false;
                    if (this.hasMinLength) {
                        this.minLength = this.control.errors['minlength'] == undefined
                            ? 0
                            : this.control.errors['minlength']['requiredLength'];
                    }
                    break;
                case 'maxlength':
                    this.control.setValue('00000000000000000000000000000000000000');
                    this.hasMaxLength = this.control.errors != null ? this.control.errors['maxlength'] != undefined : false;
                    if (this.hasMaxLength) {
                        this.maxLength = this.control.errors['maxlength'] == undefined
                            ? 0
                            : this.control.errors['maxlength']['requiredLength'];
                    }
                    break;
                case 'email':
                    this.control.setValue(' ');
                    this.hasEmail = this.control.errors != null ? this.control.errors['email'] != undefined : false;
                    this.hasEmail ? this.hasMinLength = this.hasMaxLength = false : false;
                    break;
            }
        });
        this.control.setValue(lastValue);
    }
}