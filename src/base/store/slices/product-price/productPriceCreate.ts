import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetType} from "../../../type/GetType";
import {AppThunk} from "../../store";
import {getAxiosInstance} from "../../../service/api";
import HandleValidationErrors from "../../../utils/HandleValidationErrors";
import {initialDataState} from "../../../utils/initialDataState";

export const productPriceCreateSlice = createSlice({
    name: 'productPricePost',
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
export const {requestStart, requestSuccess, requestFailure} = productPriceCreateSlice.actions;
export default productPriceCreateSlice.reducer;

export const productPriceCreate = (dataModel: any): AppThunk => async (dispatch) => {
    try {
        dispatch(requestStart());
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.post('/product-price', {
            ProductId: dataModel.ProductId.code,
            // MediaId: dataModel.MediaId,
            Price: dataModel.Price,
            Description: dataModel.Description,
            AppliedOn: dataModel.AppliedOn,
        });
        dispatch(requestSuccess(response.data));
    } catch (error: any) {
        const handledError = HandleValidationErrors(error.response.data)
        dispatch(requestFailure(handledError));
    }
};