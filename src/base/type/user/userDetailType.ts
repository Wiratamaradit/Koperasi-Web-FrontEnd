export interface UserDetailType {
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
    Email:       string;
    PhoneNumber: string;
    Address:     string;
    VerifiedOn:  null;
    Status:      string;
    CreatedAt:   string;
}

export interface Meta {
}