export interface User {
    Name: string;
    Message: string;
    Code: number;
    Status: number;
    RequestTime: number;
    Data: Data;
    Meta: Meta;
}

export interface Data {
    User: User;
    Device: Device;
}

export interface Device {
    AccessToken: string;
    ExpiredAt: Date;
    ExpiredAtFormatted: string;
    FirebaseToken: string;
    Timezone: string;
    Language: string;
}

export interface User {
    Id: string;
    Name: string;
    Identity: string;
    PhoneNumber: string;
    Address: string;
    IsVerified: boolean;
}

export interface Meta {
}
