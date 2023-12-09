export interface UserListType {
    Name:        string;
    Message:     string;
    Code:        number;
    Status:      number;
    RequestTime: number;
    Data:        Datum[];
    Meta:        Meta;
}

export interface Datum {
    Id:          string;
    Name:        string;
    Email:       string;
    PhoneNumber: string;
    Address:     null | string;
    VerifiedOn:  null | string;
}

export interface Meta {
    Record: Page;
    Page:   Page;
    Links:  Links;
}

export interface Links {
    Self:  string;
    First: string;
    Prev:  null;
    Next:  null;
    Last:  string;
}

export interface Page {
    Current: number;
    Total:   number;
}
