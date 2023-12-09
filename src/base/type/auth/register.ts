export interface Register {
    Name: string;
    Identity: string;
    PhoneNumber: string | number | undefined | null;
    Address: string;
    Password: string;
    ConfirmPassword: string;
    router?: any;
}