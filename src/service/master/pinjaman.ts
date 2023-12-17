import axios from "axios";

export type TPinjaman = {
    id_pinjaman?: number;
    id_anggota?: number;
    tgl_pinjaman: string;
    pinjaman: any;
    bunga: string;
    tenor: string;
    jatuh_tempo: string;
    deskripsi: string;
    status: string;
};

export const URL_PINJAMAN_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/listPinjaman`
export const URL_PINJAMAN_Detail = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/editPinjaman`
export const URL_PINJAMAN_CREATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/addPinjaman`
export const URL_PINJAMAN_UPDATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/updatePinjaman`
export const URL_PINJAMAN_DELETE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/deletePinjaman`

export function listAnggota() {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/listAnggota`);
}


export function listPinjaman() {
    return axios.get(URL_PINJAMAN_LIST);
}

export function detailPinjaman(id_pinjaman: any) {
    return axios.get(URL_PINJAMAN_Detail + `/${id_pinjaman}`)
}

export function createPinjaman(data: TPinjaman) {
    return axios.post(URL_PINJAMAN_CREATE, {
        anggota: data.id_anggota,
        tgl_pinjaman: data.tgl_pinjaman,
        pinjaman: data.pinjaman,
        bunga: data.bunga,
        tenor: data.tenor,
        jatuh_tempo: data.jatuh_tempo,
        deskripsi: data.deskripsi,
        status: data.status
    });
}

export function updatePinjaman(data: TPinjaman, id_pinjaman: any) {
    return axios.put(URL_PINJAMAN_UPDATE + `/${id_pinjaman}`, {
        anggota: data.id_anggota,
        tgl_pinjaman: data.tgl_pinjaman,
        pinjaman: data.pinjaman,
        bunga: data.bunga,
        tenor: data.tenor,
        jatuh_tempo: data.jatuh_tempo,
        deskripsi: data.deskripsi,
        status: data.status
    });
}

export function deletePinjaman(id_pinjaman: any) {
    return axios.delete(URL_PINJAMAN_DELETE + `/${id_pinjaman}`)
}