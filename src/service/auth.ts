import axios from "axios";

export const LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/login`
export const REGISTER_URL = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/register`

export function login(
    email: string,
    password: string
) {
    return axios.post(LOGIN_URL, {
        email,
        password
    })
}

export function register(
    name: string,
    email: string,
    password: string
) {
    return axios.post(REGISTER_URL, {
        name,
        email,
        password
    })
}