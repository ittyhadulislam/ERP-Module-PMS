import { getDataFixedAssetTransferApprovalForApproved, getDataForExternalTransfer, getDataForInternalTransfer } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const queryFixedAssetTransferApproval = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getInternalTransferDetailsForApproval: builder.query({
            query: ({ comID, userName }) => `${getDataForInternalTransfer}?comID=${comID}&InputUser=${userName}`
        }),
        getExternalTransferDetailsForApproval: builder.query({
            query: ({ comID, userName }) => `${getDataForExternalTransfer}?ComID=${comID}&InputUser=${userName}`
        }),
        getInternalAndExternalDetailsApproved: builder.query({
            query: (comID) => `${getDataFixedAssetTransferApprovalForApproved}?ComID=${comID}`
        }),
    })
})

export const {
    useGetInternalTransferDetailsForApprovalQuery,
    useGetExternalTransferDetailsForApprovalQuery,
    useLazyGetInternalAndExternalDetailsApprovedQuery
} = queryFixedAssetTransferApproval