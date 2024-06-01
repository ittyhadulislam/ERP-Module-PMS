import { apiSlice } from './../../../api/apiSlice';
import {
    getAddViewInTableRentedAssetReturnDetails,
    getCurrentHolderRentedAssetReturn,
    getSupplierRentedAssetReturn,
    getViewInTableRentedAssetReturnDetails
} from '../../../../apiRoutes/assetManagement';

const queryRentedAssetReturn = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getCurrentHolderForRentedAssetReturn: builder.query({
            query: () => `${getCurrentHolderRentedAssetReturn}`
        }),
        getSupplierForRentedAssetReturn: builder.query({
            query: (comID) => `${getSupplierRentedAssetReturn}?currentHolder=${comID}`
        }),
        getViewInTableForRentedAssetReturnDetails: builder.query({
            query: (payload) => payload && `${getViewInTableRentedAssetReturnDetails}?currentHolderId=${payload.comID}&supplierId=${payload.supID}`
        }),
        getAddViewInTableForRentedAssetReturnDetails: builder.query({
            query: (payload) => payload && `${getAddViewInTableRentedAssetReturnDetails}?currentHolderId=${payload.comID}&supplierId=${payload.supID}`
        })
    })
})


export const {
    useGetCurrentHolderForRentedAssetReturnQuery,
    useLazyGetSupplierForRentedAssetReturnQuery,
    useLazyGetViewInTableForRentedAssetReturnDetailsQuery,
    useLazyGetAddViewInTableForRentedAssetReturnDetailsQuery,
} = queryRentedAssetReturn