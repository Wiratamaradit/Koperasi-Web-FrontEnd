export interface SuccessRegister {
    Name:        string;
    Message:     string;
    Code:        number;
    Status:      number;
    RequestTime: number;
    Data:        Data;
    Meta:        Meta;
}

export interface Data {
    Id:          string;
    Name:        string;
    Identity:    string;
    PhoneNumber: string;
    Address:     string;
    IsVerified:  boolean;
}

export interface Meta {
}