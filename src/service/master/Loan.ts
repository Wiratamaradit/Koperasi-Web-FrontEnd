import axios from "axios";

export type TLoan = {
  id?: number;
  userId: number;
  nominal: number;
  interest: number;
  tenor: string;
  date: string | Date;
  description: string;
  loanStatus: string;
  validationStatus: string;
  status: string;
  reason: string;
};

export const URL_LOAN_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/loanList`;
export const URL_LOAN_CREATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/loanAdd`;
export const URL_LOAN_UPDATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/loanUpdate`;
export const URL_LOAN_EDIT = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/loanEdit`;

export function loanList(userId?: number) {
  let url = URL_LOAN_LIST;

  if (userId) {
    url = `${URL_LOAN_LIST}?userId=${userId}`;
  }
  console.log(userId)
  return axios.get(url);
}

export function loanCreate(data: TLoan) {
  console.log(data);
  return axios.post(URL_LOAN_CREATE, {
    userId: data.userId,
    nominal: data.nominal,
    interest: data.interest,
    tenor: data.tenor,
    date: data.date,
    description: data.description,
    loanStatus: data.loanStatus,
    validationStatus: data.validationStatus,
    status: data.status,
    reason: data.reason,
  });
}

export function loanEdit(id: any) {
  return axios.get(URL_LOAN_EDIT + `/${id}`);
}

export function loanUpdate(data: TLoan, id: any) {
  return axios.put(URL_LOAN_UPDATE + `/${id}`, {
    userId: data.userId,
    nominal: data.nominal,
    interest: data.interest,
    tenor: data.tenor,
    date: data.date,
    description: data.description,
    loanStatus: data.loanStatus,
    validationStatus: data.validationStatus,
    status: data.status,
    reason: data.reason,
  });
}
