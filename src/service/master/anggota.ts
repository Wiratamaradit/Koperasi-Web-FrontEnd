import axios from "axios";

export type TAnggota = {
    id?: number;
    nik: number;
    name: string;
    ttl: any;
    alamat: string;
    departemen: string;
    jabatan: string;
    golongan: string;
    divisi: string;
    status_karyawan: string;
    deskripsi: string;
};

export const URL_ANGGOTA_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/list`
export const URL_ANGGOTA_Detail = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/editAnggota`
export const URL_ANGGOTA_CREATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/addAnggota`
export const URL_ANGGOTA_UPDATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/updateAnggota`
export const URL_ANGGOTA_DELLETE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/deleteAnggota`


export function listAnggota() {
    return axios.get(URL_ANGGOTA_LIST)
}

export function detailAnggota(id: any) {
    return axios.get(URL_ANGGOTA_Detail + `/${id}`)
}

export function createAnggota(data: TAnggota) {
    return axios.post(URL_ANGGOTA_CREATE, {
        nik: data.nik,
        name: data.name,
        ttl: data.ttl,
        alamat: data.alamat,
        departemen: data.departemen,
        jabatan: data.jabatan,
        golongan: data.golongan,
        divisi: data.divisi,
        status_karyawan: data.status_karyawan,
        deskripsi: data.deskripsi
    });
}

export function updateAnggota(data: TAnggota, id: any) {
    return axios.put(URL_ANGGOTA_UPDATE + `/${id}`, {
        nik: data.nik,
        name: data.name,
        ttl: data.ttl,
        alamat: data.alamat,
        departemen: data.departemen,
        jabatan: data.jabatan,
        golongan: data.golongan,
        divisi: data.divisi,
        status_karyawan: data.status_karyawan,
        deskripsi: data.deskripsi
    });
}

export function deleteAnggota(id: any) {
    return axios.delete(URL_ANGGOTA_DELLETE + `/${id}`)
}