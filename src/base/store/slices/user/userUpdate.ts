import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import {initialDataState} from "../../../utils/initialDataState";

export const userUpdateSlice = createSlice({
    name: 'userPut',
    initialState: initialDataState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
            state.status = null;
        },
        requestSuccess(state, action: PayloadAction<GetType>) {
            state.loading = false;
            state.error = null;
            state.message = action.payload.Message;
            state.status = action.payload.Status;
            state.data = action.payload.Data;
            state.meta = action.payload.Meta;
        },
        requestFailure(state, action: PayloadAction<any>) {
            state.loading = false;
            state.message = action.payload;
            state.status = action.payload.Status;
        },
    }
})
export const {requestStart, requestSuccess, requestFailure} = userUpdateSlice.actions;
export default userUpdateSlice.reducer;

export const userUpdate = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.put('/user/' + dataModel.Id, {
            RoleId: dataModel.RoleId || dataModel.Role.code || dataModel.Role.Id,
            RegionId: dataModel.RegionId || dataModel.Region.code || dataModel.Region.Id,
            Name: dataModel.Name,
            Identity: dataModel.Identity,
            PhoneNumber: dataModel.PhoneNumber,
            Address: dataModel.Address,
            Status: dataModel.Status.code || dataModel.Status,
        });
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        dispatch(requestFailure(error.message));
    }
};