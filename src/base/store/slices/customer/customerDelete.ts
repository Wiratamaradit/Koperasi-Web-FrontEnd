import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialDataState} from "../../../utils/initialDataState";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";

export const customerDeleteSlice = createSlice({
    name: 'customerDel',
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
export const {requestStart, requestSuccess, requestFailure} = customerDeleteSlice.actions;
export default customerDeleteSlice.reducer;

export const customerDelete = (id: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.delete('/customer/' + id);
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};