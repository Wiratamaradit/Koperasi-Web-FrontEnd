import axios from "axios";

export type TUser = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  nik: number;
  position: string;
  employeeStatus: string;
  branchName: string;
  managerName: string;
  joinDate: string;
  address: string;
  phoneNumber: string;
  bankName: string;
  accountNumber: string;
  validationStatus: string;
  registrationStatus: string;
  status: string;
};

export const URL_USER_LIST = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/userList`;
export const URL_USER_CREATE = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}/api/userAdd`;

export function userList() {
  return axios.get(URL_USER_LIST);
}

export function userCreate(data: TUser) {
  return axios.post(URL_USER_CREATE, {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    nik: data.nik,
    position: data.position,
    employeeStatus: data.employeeStatus,
    branchName: data.branchName,
    managerName: data.managerName,
    joinDate: data.joinDate,
    address: data.address,
    phoneNumber: data.phoneNumber,
    bankName: data.bankName,
    accountNumber: data.accountNumber,
    
  });
}
