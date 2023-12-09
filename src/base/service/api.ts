import axios, {AxiosInstance} from 'axios';

let axiosInstance: AxiosInstance;

export const getAxiosInstance = () => {
    if (!axiosInstance) {
        if (typeof window !== 'undefined') {
            const identifier = navigator.product + navigator.productSub
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            axiosInstance = axios.create({
                // baseURL: 'https://dynamic-pricing-api.pertaminalubricants.com/',
                baseURL: apiUrl,
                headers: {
                    "Content-Type": "application/json",
                    "X-Client-Key": "AppKey",
                    "X-Client-Secret": "AppSecret",
                    "X-Device-identifier": identifier,
                    "X-Identity-Method": "Idaman",
                }
            });
        }


        axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('authOidc');
            if (token) {
                config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            }
            return config;
        });
    }

    return axiosInstance;
};