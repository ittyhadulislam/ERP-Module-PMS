import { getDataApprovedRentedAssetReturnApproval, getDataForApproval } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const queryRentedAssetApproval = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getRentedAssetForApproval: builder.query({
            query: (comID) => `${getDataForApproval}?comID=${comID}`
        }),
        getRentedAssetApproved: builder.query({
            query: (comID) => `${getDataApprovedRentedAssetReturnApproval}?comID=${comID}`
        })
    })
})

export const {
    useGetRentedAssetForApprovalQuery,
    useLazyGetRentedAssetApprovedQuery
} = queryRentedAssetApproval