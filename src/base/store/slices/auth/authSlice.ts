import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../../../type/login/user";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import {TLogin} from "../../../type/auth/login";
import {ErrorLogin} from "../../../type/login/error";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";

interface AuthState {
    loading: boolean;
    error: string | any;
    success: string | null;
    user: User | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    success: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetInitialState(state) {
            state.error = null;
            state.success = null;
        },
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{ data: User, router: any }>) {
            state.loading = false;
            state.error = null;
            state.success = action.payload.data.Message;
            state.user = action.payload.data.Data.User;
            localStorage.setItem('sessionAuth', action.payload.data.Data.Device.AccessToken);
            localStorage.setItem('detailAuth', JSON.stringify(action.payload.data.Data.User));
            const router = action.payload.router;
            router.push('/');
        },
        loginFailure(state, action: PayloadAction<ErrorLogin>) {
            state.loading = false;
            state.error = action.payload;
        },
        resetAllState(state) {
            Object.assign(state, initialState);
        },
        logout(state, action: PayloadAction<{ router?: any }>) {
            state.loading = false;
            state.error = null;
            state.user = null;
            localStorage.removeItem('sessionAuth');
            localStorage.removeItem('detailAuth');
            const router = action.payload.router;
            router.push('/login');
        },
    },
});

export const {loginStart, loginSuccess, loginFailure, logout, resetInitialState, resetAllState} = authSlice.actions;
export default authSlice.reducer;

export const login = (data: TLogin): AppThunk => async (dispatch) => {
    try {
        dispatch(loginStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.post('/auth/login', {
            Identity: data.Identity,
            Password: data.Password,
            RememberMe: data.RememberMe,
            FirebaseToken: data.FirebaseToken
        });
        dispatch(loginSuccess({data: response.data, router: data.router}));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(loginFailure(handledError));
    }
};
