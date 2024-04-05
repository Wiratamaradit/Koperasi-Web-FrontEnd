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
};

export const URL_LOAN_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/loanList`;
export const URL_LOAN_CREATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/loanAdd`;

export function loanList(userId?: number) {
  let url = URL_LOAN_LIST
  if(userId) {
    url = `${URL_LOAN_LIST}?userId=${userId}`
  }
  console.log(url)
  return axios.get(url);
}

export function loanCreate(data: TLoan) {
  console.log(data)
  return axios.post(URL_LOAN_CREATE, {
    userId: data.userId,
    nominal: data.nominal,
    interest: data.interest,
    tenor: data.tenor,
    date: data.date,
    description: data.description,
    loanStatus: data.loanStatus,
    validationStatus: data.validationStatus,
    status: data.status
  });
}
