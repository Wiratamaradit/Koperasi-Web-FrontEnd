import { TValidator } from './Validators';

export interface CustomValidationOptions {
    function: string;
}

export interface CustomValidation extends TValidator {
    type: 'CustomValidation';
    options: CustomValidationOptions;
}