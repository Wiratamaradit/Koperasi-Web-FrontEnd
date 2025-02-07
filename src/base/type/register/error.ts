export interface ErrorRegister {
    Name:        string;
    Message:     string;
    Code:        number;
    Status:      number;
    RequestTime: number;
    Data:        Data;
    Errors:      Errors;
    Meta:        Data;
}

export interface Data {
}

export interface Errors {
    Validation: Validation;
    StackTrace: Data;
}

export interface Validation {
    Identity:        string[];
    Name:            string[];
    PhoneNumber:     string[];
    Password:        string[];
    ConfirmPassword: string[];
}
