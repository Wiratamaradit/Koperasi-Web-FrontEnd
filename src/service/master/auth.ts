import axios from "axios";

export const LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/userLogin`

export function userLogin(
    email: string,
    password: string
) {
    return axios.post(LOGIN_URL, {
        email,
        password
    })
}
