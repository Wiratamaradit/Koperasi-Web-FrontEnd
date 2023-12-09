import {Profile, User} from "../../../type/profile/profileType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";

interface DataState {
    loading: boolean;
    error: string | any;
    success: string | null;
    status: number | null;
    data: Profile | any;
}

const initialState: DataState = {
    loading: false,
    error: null,
    success: null,
    status: null,
    data: null,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
            state.status = null;
        },
        requestSuccess(state, action: PayloadAction<Profile>) {
            state.loading = false;
            state.error = null;
            state.success = action.payload.Message;
            state.status = action.payload.Status;
            state.data = action.payload.Data.User;
        },
        requestFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {requestStart, requestSuccess, requestFailure} = profileSlice.actions;

export default profileSlice.reducer;

export const detailProfile = (router?: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.get('/account/profile');
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        if (error) {
            localStorage.removeItem('sessionAuth');
        }
        dispatch(requestFailure(error.message));
    }
};
