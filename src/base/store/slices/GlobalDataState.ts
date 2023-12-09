import {GetType, Meta} from "../../type/GetType";

export interface GlobalDataState {
    loading: boolean;
    error?: string | any;
    success?: string | null;
    message?: string | null;
    status: number | null;
    data: GetType | any;
    meta: Meta ;
}
