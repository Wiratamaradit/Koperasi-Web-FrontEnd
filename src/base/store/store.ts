import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import counterSlice from "./slices/counterSlice ";
import {TypedUseSelectorHook, useDispatch, useSelector,} from "react-redux";
import profileSlice from "./slices/profile/profileSlice";
import authSlice from "./slices/auth/authSlice";
import profileEditSlice from "./slices/profile/profileEditSlice";
import registerSlice from "./slices/auth/register";
import userSlice from "./slices/user/userSlice";
import regionSlice from "./slices/region/regionSlice";
import regionCreateSlice from "./slices/region/regionCreate";
import regionUpdateSlice from "./slices/region/regionUpdate";
import regionDetailSlice from "./slices/region/regionDetail";
import customerSlice from "./slices/customer/customerSlice";
import customerCreateSlice from "./slices/customer/customerCreate";
import customerUpdateSlice from "./slices/customer/customerUpdate";
import customerSegmentSlice from "./slices/customer-segment/customerSegmentSlice";
import customerSegmentCreateSlice from "./slices/customer-segment/customerSegmentCreate";
import customerSegmentUpdateSlice from "./slices/customer-segment/customerSegmentUpdate";
import productSlice from "./slices/product/productSlice";
import productCreateSlice from "./slices/product/productCreate";
import productUpdateSlice from "./slices/product/productUpdate";
import productProfileSlice from "./slices/product-profile/productProfileSlice";
import productProfileCreateSlice from "./slices/product-profile/productProfileCreate";
import productProfileUpdateSlice from "./slices/product-profile/productProfileUpdate";
import productSegmentSlice from "./slices/product-segment/productSegmentSlice";
import productSegmentCreateSlice from "./slices/product-segment/productSegmentCreate";
import productSegmentUpdateSlice from "./slices/product-segment/productSegmentUpdate";
import shipPartySlice from "./slices/ship-party/shipPartySlice";
import shipPartyCreateSlice from "./slices/ship-party/shipPartyCreate";
import shipPartyUpdateSlice from "./slices/ship-party/shipPartyUpdate";
import shipPartyGroupSlice from "./slices/ship-party-group/shipPartyGroupSlice";
import shipPartyGroupCreateSlice from "./slices/ship-party-group/shipPartyGroupCreate";
import shipPartyGroupUpdateSlice from "./slices/ship-party-group/shipPartyGroupUpdate";
import soldPartySlice from "./slices/sold-party/soldPartySlice";
import soldPartyCreateSlice from "./slices/sold-party/soldPartyCreate";
import soldPartyUpdateSlice from "./slices/sold-party/soldPartyUpdate";
import customerDetailSlice from "./slices/customer/customerDetail";
import productDetailSlice from "./slices/product/productDetail";
import customerSegmentDetailSlice from "./slices/customer-segment/customerSegmentDetail";
import productProfileDetailSlice from "./slices/product-profile/productProfileDetail";
import productSegmentDetailSlice from "./slices/product-segment/productSegmentDetail";
import shipPartyDetailSlice from "./slices/ship-party/shipPartyDetail";
import shipPartyGroupDetailSlice from "./slices/ship-party-group/shipPartyGroupDetail";
import soldPartyDetailSlice from "./slices/sold-party/soldPartyDetail";
import userCreateSlice from "./slices/user/userCreate";
import userUpdateSlice from "./slices/user/userUpdate";
import userDetailSlice from "./slices/user/useDetail";
import roleSlice from "./slices/role/roleSlice";
import roleCreateSlice from "./slices/role/roleCreate";
import roleUpdateSlice from "./slices/role/roleUpdate";
import roleDetailSlice from "./slices/role/roleDetail";
import productCostSlice from "./slices/product-cost/productCostSlice";
import productCostCreateSlice from "./slices/product-cost/productCostCreate";
import productCostUpdateSlice from "./slices/product-cost/productCostUpdate";
import productCostDetailSlice from "./slices/product-cost/productCostDetail";
import productPriceSlice from "./slices/product-price/productPriceSlice";
import productPriceCreateSlice from "./slices/product-price/productPriceCreate";
import productPriceUpdateSlice from "./slices/product-price/productPriceUpdate";
import productPriceDetailSlice from "./slices/product-price/productPriceDetail";
import userDeleteSlice from "./slices/user/userDelete";
import roleDeleteSlice from "./slices/role/roleDelete";
import regionDeleteSlice from "./slices/region/regionDelete";
import customerDeleteSlice from "./slices/customer/customerDelete";
import customerSegmentDeleteSlice from "./slices/customer-segment/customerSegmentDelete";
import productDeleteSlice from "./slices/product/productDelete";
import productProfileDeleteSlice from "./slices/product-profile/productProfileDelete";
import productSegmentDeleteSlice from "./slices/product-segment/productSegmentDelete";
import productCostDeleteSlice from "./slices/product-cost/productCostDelete";
import productPriceDeleteSlice from "./slices/product-price/productPriceDelete";
import shipPartyDeleteSlice from "./slices/ship-party/shipPartyDelete";
import shipPartyGroupDeleteSlice from "./slices/ship-party-group/shipPartyGruopDelete";
import soldPartyDeleteSlice from "./slices/sold-party/soldPartyDelete";
import proposalSlice from "./slices/proposal/proposalReviewSlice";
import proposalReviewSlice from "./slices/proposal/reviewProposal";
import proposalReviseSlice from "./slices/proposal/reviseProposal";
import proposalSubmitSlice from "./slices/proposal/submitProposal";
import proposalDetailSlice from "./slices/proposal/proposalDetail";
import addCustomerProposalSlice from "./slices/proposal/addCutomerProposal";
import proposalDeleteSlice from "./slices/proposal/deleteProposal";
import shipPartyGroupImportSlice from "./slices/ship-party-group/shipPartyGroupImport";
import customerImportSlice from "./slices/customer/customerImport";
import productImportSlice from "./slices/product/productImport";
import soldPartyImportSlice from "./slices/sold-party/soldPartyImport";
import shipPartyImportSlice from "./slices/ship-party/shipPartyImport";
import customerSegmentImportSlice from "./slices/customer-segment/customerSegmentImport";
import productCostImportSlice from "./slices/product-cost/productCostImport";
import productSegmentImportSlice from "./slices/product-segment/productSegmentImport";
import productProfileImportSlice from "./slices/product-profile/productProfileImport";
import productPriceImportSlice from "./slices/product-price/productPriceImport";
import proposalExportSlice from "./slices/proposal/proposalImport";
import roleSchemeSlice from "./slices/role-scheme/roleSchemeSlice";
import roleSchemeDetailSlice from "./slices/role-scheme/roleSchemeDetail";
import roleSchemeCreateSlice from "./slices/role-scheme/roleSchemeCreate";
import roleSchemeUpdateSlice from "./slices/role-scheme/roleSchemeUpdate";
import roleSchemeDeleteSlice from "./slices/role-scheme/roleSchemeDelete";

export const store = configureStore({
    reducer: {
        data: counterSlice,
        profile: profileSlice,
        profileEdit: profileEditSlice,
        auth: authSlice,
        register: registerSlice,
        //
        user: userSlice,
        userPost: userCreateSlice,
        userPut: userUpdateSlice,
        userDel: userDeleteSlice,
        userDetail: userDetailSlice,
        //
        role: roleSlice,
        rolePost: roleCreateSlice,
        rolePut: roleUpdateSlice,
        roleDel: roleDeleteSlice,
        roleDetail: roleDetailSlice,
        //
        roleScheme: roleSchemeSlice,
        roleSchemePost: roleSchemeCreateSlice,
        roleSchemePut: roleSchemeUpdateSlice,
        roleSchemeDel: roleSchemeDeleteSlice,
        roleSchemeDetail: roleSchemeDetailSlice,
        //
        region: regionSlice,
        regionPost: regionCreateSlice,
        regionPut: regionUpdateSlice,
        regionDel: regionDeleteSlice,
        regionDetail: regionDetailSlice,
        //
        customer: customerSlice,
        customerPost: customerCreateSlice,
        customerPut: customerUpdateSlice,
        customerDel: customerDeleteSlice,
        customerDetail: customerDetailSlice,
        customerImport: customerImportSlice,
        //
        customerSegment: customerSegmentSlice,
        customerSegmentPost: customerSegmentCreateSlice,
        customerSegmentPut: customerSegmentUpdateSlice,
        customerSegmentDel: customerSegmentDeleteSlice,
        customerSegmentDetail: customerSegmentDetailSlice,
        customerSegmentImport: customerSegmentImportSlice,
        //
        product: productSlice,
        productPost: productCreateSlice,
        productPut: productUpdateSlice,
        productDel: productDeleteSlice,
        productDetail: productDetailSlice,
        productImport: productImportSlice,
        //
        productProfile: productProfileSlice,
        productProfilePost: productProfileCreateSlice,
        productProfilePut: productProfileUpdateSlice,
        productProfileDel: productProfileDeleteSlice,
        productProfileDetail: productProfileDetailSlice,
        productProfileImport: productProfileImportSlice,
        //
        productSegment: productSegmentSlice,
        productSegmentPost: productSegmentCreateSlice,
        productSegmentPut: productSegmentUpdateSlice,
        productSegmentDel: productSegmentDeleteSlice,
        productSegmentDetail: productSegmentDetailSlice,
        productSegmentImport: productSegmentImportSlice,
        //
        productCost: productCostSlice,
        productCostPost: productCostCreateSlice,
        productCostPut: productCostUpdateSlice,
        productCostDel: productCostDeleteSlice,
        productCostDetail: productCostDetailSlice,
        productCostImport: productCostImportSlice,
        //
        productPrice: productPriceSlice,
        productPricePost: productPriceCreateSlice,
        productPricePut: productPriceUpdateSlice,
        productPriceDel: productPriceDeleteSlice,
        productPriceDetail: productPriceDetailSlice,
        productPriceImport: productPriceImportSlice,
        //
        shipParty: shipPartySlice,
        shipPartyPost: shipPartyCreateSlice,
        shipPartyPut: shipPartyUpdateSlice,
        shipPartyDel: shipPartyDeleteSlice,
        shipPartyDetail: shipPartyDetailSlice,
        shipPartyImport: shipPartyImportSlice,
        //
        shipPartyGroup: shipPartyGroupSlice,
        shipPartyGroupPost: shipPartyGroupCreateSlice,
        shipPartyGroupPut: shipPartyGroupUpdateSlice,
        shipPartyGroupDel: shipPartyGroupDeleteSlice,
        shipPartyGroupDetail: shipPartyGroupDetailSlice,
        shipPartyGroupImport: shipPartyGroupImportSlice,
        //
        soldParty: soldPartySlice,
        soldPartyPost: soldPartyCreateSlice,
        soldPartyPut: soldPartyUpdateSlice,
        soldPartyDel: soldPartyDeleteSlice,
        soldPartyDetail: soldPartyDetailSlice,
        soldPartyImport: soldPartyImportSlice,
        //
        proposal: proposalSlice,
        proposalExport: proposalExportSlice,
        proposalDetail: proposalDetailSlice,
        proposalReview: proposalReviewSlice,
        proposalRevise: proposalReviseSlice,
        proposalSubmit: proposalSubmitSlice,
        proposalAddCustomer: addCustomerProposalSlice,
        proposalDelete: proposalDeleteSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector