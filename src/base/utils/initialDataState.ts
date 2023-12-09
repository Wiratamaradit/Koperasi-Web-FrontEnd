import {GlobalDataState} from "../store/slices/GlobalDataState";

export const initialDataState: GlobalDataState = {
    loading: false,
    message: null,
    status: null,
    data: null,
    meta: {
        Links: {
            Self: '',
            First: '',
            Prev: null,
            Next: null,
            Last: '',
        },
        Page: {
            Current: 0,
            Total: 0,
        },
        Record: {
            Current: 0,
            Total: 0,
        }
    },
};