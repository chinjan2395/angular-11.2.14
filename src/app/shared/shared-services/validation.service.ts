import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  constructor() {
  }

  static blankSpaceValidator(reg: string | null = null): ValidatorFn {
    const match: RegExp = reg == null ? /^([^\s])([\s[a-zA-Z\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF0-9_@./#&+-]*)([^\s])$/ : new RegExp(reg);
    return (control: AbstractControl): { [key: string]: any } | null => {
      control.markAsDirty();
      const NUMBER_REGEXP = new RegExp(match);
      control.markAsTouched();
      if (NUMBER_REGEXP.exec(control.value)) {
        return null;
      }
      return {customPattern: {blank: true}};
    };
  }

  static nameValidator(reg: string = '^[a-zA-Z\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF ]+$'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      control.markAsDirty();
      const NUMBER_REGEXP = new RegExp(reg);
      control.markAsTouched();
      if (NUMBER_REGEXP.exec(control.value)) {
        return null;
      }
      return {customPattern: {name: true}};
    };
  }

  static usernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      control.markAsDirty();
      const NUMBER_REGEXP = new RegExp(/^([0-9a-zA-Z\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF_@./#&+-]*)(?:[0-9a-zA-Z\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+)$/);
      control.markAsTouched();
      if (NUMBER_REGEXP.exec(control.value)) {
        return null;
      }
      return {customPattern: {username: true}};
    };
  }

  static numberValidator(reg: string = '^[0-9]*$'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      control.markAsDirty();
      const NUMBER_REGEXP = new RegExp(reg);
      control.markAsTouched();
      if (NUMBER_REGEXP.exec(control.value)) {
        return null;
      }
      return {customPattern: {number: true}};
    };
  }

  static emailValidator(reg: string = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      control.markAsDirty();
      const NUMBER_REGEXP = new RegExp(reg);
      control.markAsTouched();
      if (NUMBER_REGEXP.exec(control.value)) {
        return null;
      }
      return {email: true};
    };
  }

  static decimalValidator(allowNegative: boolean = false, allow: number = 4): ValidatorFn {
    const match: RegExp = /^[0-9]+([.,][0-9]{1,4})?$/;
    let NUMBER_REGEXP = new RegExp(match.source.replace('[0-9]', allowNegative ? '-?[0-9]' : '[0-9]'));
    return (control: AbstractControl): { [key: string]: any } | null => {
      control.markAsDirty();
      NUMBER_REGEXP = new RegExp(NUMBER_REGEXP.source.replace('4', allow.toString()));
      control.markAsTouched();
      if (NUMBER_REGEXP.exec(control.value)) {
        return null;
      }
      return {customPattern: {decimal: {upto: allow}}};
    };
  }

  static forbiddenValidator(regExps: Array<RegExp>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = [];
      regExps.forEach((regExp: RegExp) => {
        if (regExp.test(control.value)) {
          forbidden.push(regExp.source);
        }
      });
      return forbidden.length > 0 ? {customPattern: {forbidden: forbidden}} : null;
    };
  }

  static passwordValidator(allow: string = 'all'): ValidatorFn {
    let match: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    switch (allow) {
      case 'all':
        break;
      case 'alphabet':
        match = /^(?=.*[a-z])/;
        break;
      case 'all-alphabet':
        match = /^(?=.*[a-z])(?=.*[A-Z])/;
        break;
      case 'alphabet-number':
        match = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
        break;
      case 'alphabet-special-character':
        match = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/;
        break;
      case 'number-special-character':
        match = /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        break;
    }
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.match(match)) {
        return null;
      } else {
        return {customPattern: {password: {type: allow}}};
      }
    };
  }

  static validateAreEqual(controlName: string, matchingControlName: any) {
    return (formGroup: FormGroup) => {
      let error = null;
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (control.value !== matchingControl.value) {
        error = {customPattern: {mustMatch: {[controlName]: true}}};
      } else {
        error = null;
      }
      control.setErrors(error);
    };
  }

  static validateOperation(controlName: string, matchingControlNames: any, operationType: string = 'equal') {
    let errorType: string;
    switch (operationType) {
      case 'equal':
        errorType = 'mustNotMatch';
        break;
      case 'less-than':
        errorType = 'mustLessThan';
        break;
      case 'greater-than':
        errorType = 'mustGreaterThan';
        break;
      case 'less-than-equal':
        errorType = 'mustLessThanEqual';
        break;
      case 'greater-than-equal':
        errorType = 'mustGreaterThanEqual';
        break;
    }

    function operation(condition: string, firstValue: any, secondValue: any): boolean {
      let result = true;
      switch (condition) {
        case 'equal':
          result = secondValue == firstValue;
          break;
        case 'less-than':
          result = secondValue < firstValue;
          break;
        case 'greater-than':
          result = secondValue > firstValue;
          break;
        case 'less-than-equal':
          result = secondValue <= firstValue;
          break;
        case 'greater-than-equal':
          result = secondValue >= firstValue;
          break;
      }
      return result;
    }

    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      let errors;
      errors = control.errors == null ? {customPattern: {[errorType]: []}} : control.errors;
      switch (typeof matchingControlNames) {
        case 'string':
          const matchingControl = formGroup.get(matchingControlNames);
          if (operation(operationType, control.value, matchingControl.value)) {
            if (errors == null) {
              errors = {customPattern: {[errorType]: []}};
            } else {
              if (errors.customPattern) {
                errors.customPattern[errorType] = [];
              } else {
                errors['customPattern'] = {[errorType]: []};
              }
            }
            errors.customPattern[errorType].push(matchingControlNames);
            control.setErrors(errors[0]);
          } else {
            errors.customPattern[errorType] = [];
          }
          break;
        case 'object':
          matchingControlNames.forEach((matchingControlName: string, index: number) => {
            const matchingControlArray = formGroup.get(matchingControlName);
            if (operation(operationType, control.value, matchingControlArray.value)) {
              if (index == 0) {
                if (errors == null) {
                  errors = {customPattern: {[errorType]: []}};
                } else {
                  if (errors.customPattern) {
                    errors.customPattern[errorType] = [];
                  } else {
                    errors['customPattern'] = {[errorType]: []};
                  }
                }
              }
              errors.customPattern[errorType] != undefined
                ? errors.customPattern[errorType].push(matchingControlName)
                : errors.customPattern[errorType] = [matchingControlName];
            }
          });
          break;
      }
      if (errors.customPattern) {
        if (errors.customPattern[errorType]) {
          if (errors.customPattern[errorType].length > 0) {
            control.setErrors(errors);
          }
        } else {
          control.setErrors(control.errors);
        }
      }
    };
  }

  static cardValidator(reg: string = '^[a-zA-Z](?=.{1})+(?=.{9}$)(?:[0-9])+$'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      control.markAsDirty();
      const NUMBER_REGEXP = new RegExp(reg);
      control.markAsTouched();
      if (NUMBER_REGEXP.exec(control.value)) {
        return null;
      }
      return {customPattern: {card: true}};
    };
  }

  static ipValidator(reg: string = '^(?=\\d+\\.\\d+\\.\\d+\\.\\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\\.?){4}$'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      control.markAsDirty();
      const NUMBER_REGEXP = new RegExp(reg);
      control.markAsTouched();
      if (NUMBER_REGEXP.exec(control.value)) {
        return null;
      }
      return {customPattern: {ip: true}};
    };
  }
}
