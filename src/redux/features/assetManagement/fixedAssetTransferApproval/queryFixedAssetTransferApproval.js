import { getDataFixedAssetTransferApprovalForApproved, getViewListExternalFixedAssetTransfer, getViewListInternalFixedAssetTransfer } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const queryFixedAssetTransferApproval = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        // getInternalTransferDetailsForApproval: builder.query({
        //     query: ({ comID, userName }) => `${getDataForInternalTransfer}?comID=${comID}&InputUser=${userName}`
        // }),
        getInternalTransferDetailsForApproval: builder.query({
            query: (payload) => `${getViewListInternalFixedAssetTransfer}?comID=${payload.comID}`
        }),
        getExternalTransferDetailsForApproval: builder.query({
            query: (payload) => `${getViewListExternalFixedAssetTransfer}?ComID=${payload.comID}`
        }),
        // getExternalTransferDetailsForApproval: builder.query({
        //     query: ({ comID, userName }) => `${getDataForExternalTransfer}?ComID=${comID}&InputUser=${userName}`
        // }),
        getInternalAndExternalDetailsApproved: builder.query({
            query: (comID) => `${getDataFixedAssetTransferApprovalForApproved}?ComID=${comID}`
        }),

    })
})
export const {
    useGetInternalTransferDetailsForApprovalQuery,
    useGetExternalTransferDetailsForApprovalQuery,
    useLazyGetInternalAndExternalDetailsApprovedQuery,
} = queryFixedAssetTransferApproval