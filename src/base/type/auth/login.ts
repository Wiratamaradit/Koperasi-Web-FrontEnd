export interface TLogin {
    Identity: string;
    Password: string;
    RememberMe?: boolean;
    FirebaseToken?: string;
    router?: any;
}