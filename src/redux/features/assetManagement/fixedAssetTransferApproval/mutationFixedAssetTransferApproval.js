import { updateExternalApproval, updateInternalApproval } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const mutationFixedAssetTransferApproval = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        updateInternalTransferApproval: builder.mutation({
            query: (payload) => ({
                url: updateInternalApproval,
                method: "PUT",
                body: payload
            })
        }),
        updateExternalTransferApproval: builder.mutation({
            query: (payload) => ({
                url: updateExternalApproval,
                method: "PUT",
                body: payload
            })
        })
    })
})

export const {
    useUpdateInternalTransferApprovalMutation,
    useUpdateExternalTransferApprovalMutation
} = mutationFixedAssetTransferApproval