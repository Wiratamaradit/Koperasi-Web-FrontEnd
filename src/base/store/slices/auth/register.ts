import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Register} from "../../../type/auth/register";
import {ErrorLogin} from "../../../type/login/error";
import {SuccessRegister} from "../../../type/register/success";
import {authSlice, loginFailure, loginStart, loginSuccess} from "./authSlice";
import {TLogin} from "../../../type/auth/login";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import {ErrorRegister} from "../../../type/register/error";

interface AuthState {
    loading: boolean;
    error: string | any;
    success: string | null;
    data: SuccessRegister | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    success: null,
    data: null,
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<{ data: SuccessRegister, router: any }>) {
            state.loading = false;
            state.error = null;
            state.success = action.payload.data.Message;
            state.data = null;
            const router = action.payload.router;
            router.push('/login');
        },
        registerFailure(state, action: PayloadAction<ErrorRegister>) {
            state.loading = false;
            state.error = action.payload.Message;
        },
    }
})

export const {registerStart, registerSuccess, registerFailure} = registerSlice.actions;

export default registerSlice.reducer;

export const register = (data: Register): AppThunk => async (dispatch) => {
    try {
        dispatch(registerStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.post('/auth/register', {
            Name: data.Name,
            Identity: data.Identity,
            PhoneNumber: data.PhoneNumber,
            Address: data.Address,
            Password: data.Password,
            ConfirmPassword: data.ConfirmPassword
        });
        dispatch(registerSuccess({data: response.data, router: data.router}));
    } catch (error: any) {
        dispatch(registerFailure(error.message));
    }
};