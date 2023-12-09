import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialDataState} from "../../../utils/initialDataState";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";

export const roleSchemeDeleteSlice = createSlice({
    name: 'roleSchemeDel',
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
export const {requestStart, requestSuccess, requestFailure} = roleSchemeDeleteSlice.actions;
export default roleSchemeDeleteSlice.reducer;

export const roleSchemeDelete = (id: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.delete('/approval-scheme/' + id);
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};