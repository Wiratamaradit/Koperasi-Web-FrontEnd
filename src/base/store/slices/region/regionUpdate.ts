import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import {initialDataState} from "../../../utils/initialDataState";

export const regionUpdateSlice = createSlice({
    name: 'regionPut',
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
export const {requestStart, requestSuccess, requestFailure} = regionUpdateSlice.actions;
export default regionUpdateSlice.reducer;

export const regionUpdate = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.put('/region/' + dataModel.Id, {
            Code: dataModel.Code,
            Name: dataModel.Name,
            Description: dataModel.Description,
            Status: dataModel.Status.code || dataModel.Status,
        });
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        dispatch(requestFailure(error.message));
    }
};