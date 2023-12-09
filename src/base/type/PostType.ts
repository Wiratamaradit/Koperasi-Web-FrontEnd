export interface PostType {
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
    Validation: any;
    StackTrace: Data;
}
