import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";
import {initialDataState} from "../../../utils/initialDataState";

export const productSegmentUpdateSlice = createSlice({
    name: 'productSegmentPut',
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
            state.success = action.payload.Message;
            state.status = action.payload.Status;
            state.data = action.payload.Data;
            state.meta = action.payload.Meta;
        },
        requestFailure(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
            state.status = action.payload.Status;
        },
    }
})
export const {requestStart, requestSuccess, requestFailure} = productSegmentUpdateSlice.actions;
export default productSegmentUpdateSlice.reducer;

export const productSegmentUpdate = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.put('/product-segment/' + dataModel.Id, {
            MediaId: dataModel.MediaId,
            Name: dataModel.Name,
            Description: dataModel.Description,
            Status: dataModel.Status.code || dataModel.Status,
        });
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};