import axios from "axios/index";

export const URL_PINJAMAN_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/list`

export function listPinjaman() {
    return axios.get(URL_PINJAMAN_LIST)
}