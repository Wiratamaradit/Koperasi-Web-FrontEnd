import axios from "axios";

export type TSavePay = {
  id?: number;
  saveId: number;
  userId: number;
  nominal: number;
  paymentMethod: string;
  date: string | Date;
  status: string;
};

export const URL_SAVE_CREATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/savepayAdd`;
export const URL_SAVE_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/savepayList`;

export function saveList() {
  return axios.get(URL_SAVE_LIST);
}

export function savepayCreate(data: TSavePay) {
  console.log(data);
  return axios.post(URL_SAVE_CREATE, {
    saveId: data.saveId,
    userId: data.userId,
    nominal: data.nominal,
    paymentMethod: data.paymentMethod,
    date: data.date,
    status: data.status,
  });
}
