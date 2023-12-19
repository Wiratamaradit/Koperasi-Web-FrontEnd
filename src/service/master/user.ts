import axios from "axios";

export type TUser = {
    id?: number;
    name: string;
    email: string;
    role: string;
    password: string;
};

export const URL_USER_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/userList`
export const URL_USER_Detail = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/userEdit`
export const URL_USER_CREATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/userAdd`
export const URL_USER_UPDATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/userUpdate`
export const URL_USER_DELETE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/userDelete`

export function listUser() {
    return axios.get(URL_USER_LIST);
}

export function createUser(data: TUser) {
    return axios.post(URL_USER_CREATE, {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
    });
}

export function updateUSer(data: TUser, id: any) {
    return axios.put(URL_USER_UPDATE + `/${id}`, {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
    });
}

export function deleteUSer(id: any) {
    return axios.delete(URL_USER_DELETE + `/${id}`)
}