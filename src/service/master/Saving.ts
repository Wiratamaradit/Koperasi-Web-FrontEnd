import axios from "axios";

export type TSaving = {
  id?: number;
  userId: number;
  nominalPerMonth: number;
  interest: number;
  date: string | Date;
  paymentMethod: string;
  timePeriod: number;
  validationSavingStatus: string;
  status: string;
};

export const URL_SAVE_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/saveList`;
export const URL_SAVE_CREATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/saveAdd`;

export function savingList(userId?: number) {
  let url = URL_SAVE_LIST
  if (userId) {
    url = `${URL_SAVE_LIST}?userId=${userId}`
  }
  return axios.get(url);
}

export function savingCreate(data: TSaving) {
    console.log(data)
  return axios.post(URL_SAVE_CREATE, {
    userId: data.userId,
    nominalPerMonth: data.nominalPerMonth,
    interest: data.interest,
    date: data.date,
    paymentMethod: data.paymentMethod,
    timePeriod: data.timePeriod,
    validationSavingStatus: data.validationSavingStatus,
    status: data.status
  });
}

