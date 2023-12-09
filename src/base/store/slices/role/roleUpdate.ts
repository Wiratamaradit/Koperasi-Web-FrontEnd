import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import {initialDataState} from "../../../utils/initialDataState";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";

export const roleUpdateSlice = createSlice({
    name: 'rolePut',
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
export const {requestStart, requestSuccess, requestFailure} = roleUpdateSlice.actions;
export default roleUpdateSlice.reducer;

export const roleUpdate = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.put('/role/' + dataModel.Id, {
            ApprovalSchemeId: dataModel.ApprovalSchemeId || dataModel.ApprovalScheme.code || dataModel.ApprovalScheme.Id,
            Name: dataModel.Name,
            Description: dataModel.Description,
            CanSubmit: dataModel.CanSubmit,
            CanApprove: dataModel.CanApprove,
            CanView: dataModel.CanView,
            HasRegion: dataModel.HasRegion,
            ApprovalStage: dataModel.ApprovalStage,
            MinVolume: dataModel.MinVolume,
            MinProfit: dataModel.MinVolume,
            MaxProfit: dataModel.MaxProfit,
            MinDiscount: dataModel.MinDiscount,
            MaxDiscount: dataModel.MaxDiscount,
            Status: dataModel.Status.code || dataModel.Status,
        });
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};