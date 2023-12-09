import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";
import {initialDataState} from "../../../utils/initialDataState";

export const roleCreateSlice = createSlice({
    name: 'rolePost',
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
export const {requestStart, requestSuccess, requestFailure} = roleCreateSlice.actions;
export default roleCreateSlice.reducer;

export const roleCreate = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.post('/role', {
            ApprovalSchemeId: dataModel.ApprovalSchemeId,
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
        });
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};