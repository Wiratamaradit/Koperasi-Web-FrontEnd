import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import {initialDataState} from "../../../utils/initialDataState";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";
import {initialResetState} from "../../../utils/initialResetState";

export const roleSchemeUpdateSlice = createSlice({
    name: 'roleSchemePut',
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
export const {requestStart, requestSuccess, requestFailure} = roleSchemeUpdateSlice.actions;
export default roleSchemeUpdateSlice.reducer;

export const roleSchemeUpdate = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.put('/approval-scheme/' + dataModel.Id, {
            Name: dataModel.Name,
            Description: dataModel.Description,
            ApprovalStages: dataModel.ApprovalStages,
            Status: dataModel.Status,
        });
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};

export const roleSchemeResetUpdateState = (): AppThunk => async (dispatch) => {
    dispatch(requestStart());
    dispatch(requestSuccess(initialResetState));
}