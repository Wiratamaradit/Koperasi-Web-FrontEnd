import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialDataState} from "../../../utils/initialDataState";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";

export const soldPartyDeleteSlice = createSlice({
    name: 'soldPartyDel',
    initialState: initialDataState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.message = null;
            state.status = null;
        },
        requestSuccess(state, action: PayloadAction<GetType>) {
            state.loading = false;
            state.message = action.payload.Message;
            state.status = action.payload.Status;
            state.data = action.payload.Data;
            state.meta = action.payload.Meta;
        },
        requestFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.message = action.payload;
        },
    }
})
export const {requestStart, requestSuccess, requestFailure} = soldPartyDeleteSlice.actions;
export default soldPartyDeleteSlice.reducer;

export const soldPartyDelete = (id: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.delete('/sold-party/' + id);
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};