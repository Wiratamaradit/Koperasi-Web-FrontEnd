import { TValidator } from './Validators';

export interface RegexValidatorOptions {
    match: string;
    example?: string;
}

export interface RegexValidator extends TValidator {
    type: 'RegexValidator';
    options: RegexValidatorOptions;
}