import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";
import {initialDataState} from "../../../utils/initialDataState";

export const regionCreateSlice = createSlice({
    name: 'regionPost',
    initialState: initialDataState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.message = null;
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
export const {requestStart, requestSuccess, requestFailure} = regionCreateSlice.actions;
export default regionCreateSlice.reducer;

export const regionCreate = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.post('/region', {
            Code: dataModel.Code,
            Name: dataModel.Name,
            Description: dataModel.Description,
            Status: dataModel.Status,
        });
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};