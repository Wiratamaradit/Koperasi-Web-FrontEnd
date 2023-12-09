import axios from "axios/index";

export const URL_ANGSURAN_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/list`

export function listAngsuran() {
    return axios.get(URL_ANGSURAN_LIST)
}