import { TValidator } from './Validators';

export interface LengthValidatorOptions {
    minLength: number;
    maxLength: number;
}

export interface LengthValidator extends TValidator {
    type: 'LengthValidator';
    options: LengthValidatorOptions;
}