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

export const profileEditSlice = createSlice({
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

        editStart(state) {
            state.loading = true;
            state.error = null;
            state.status = null;
        },
        editSuccess(state, action: PayloadAction<Profile>) {
            state.loading = false;
            state.error = null;
            state.success = action.payload.Message;
            state.status = action.payload.Status;
            state.data = action.payload.Data.User;
        },
        editFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {editStart, editSuccess, editFailure} = profileEditSlice.actions;

export default profileEditSlice.reducer;

export const editProfile = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(editStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.put('/account/profile/edit', {
            Name: dataModel.Name,
            Email: dataModel.Email,
            PhoneNumber: dataModel.PhoneNumber,
            RoleId: dataModel.RoleId,
            RegionId: dataModel.RegionId,
            Image: dataModel.Image,
        });
        dispatch(editSuccess(response.data));
    } catch (error: any) {
        dispatch(editFailure(error.message));
    }
};

