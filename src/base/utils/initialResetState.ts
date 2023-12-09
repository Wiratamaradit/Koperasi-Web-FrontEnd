import {GetType} from "../type/GetType";

export const initialResetState: GetType = {
    Name: "",
    Message: "",
    Code: 0,
    Status: 0,
    RequestTime: 0,
    Data: [],
    Meta: {
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
        },
    },
};