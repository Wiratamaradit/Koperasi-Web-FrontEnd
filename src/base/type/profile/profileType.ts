export interface Profile {
    Name:        string;
    Message:     string;
    Code:        number;
    Status:      number;
    RequestTime: number;
    Data:        Data;
    Meta:        Meta;
}

export interface Data {
    User: User;
}

export interface User {
    Name:        string;
    Email:       string;
    PhoneNumber: string;
    Address?:     string;
}

export interface Meta {
}