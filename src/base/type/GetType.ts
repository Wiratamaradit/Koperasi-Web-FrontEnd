export interface GetType {
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
    Code:        string;
    Name:        string;
    Description: string;
    Status:      string;
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
