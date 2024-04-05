import axios from "axios";

export type TInstallment = {
  id?: number;
  loanId: number;
  nominalPayment: number;
  date: string | Date;
  paymentMethod: string;
  paymentStatus: string;
  installmentStatus: string;
};

export const URL_INSTALLMENT_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/installList`;

export function installmentList(userId?: number) {
  let url = URL_INSTALLMENT_LIST;
  if (userId) {
    url = `${URL_INSTALLMENT_LIST}?userId=${userId}`;
  }
  return axios.get(url);
}
