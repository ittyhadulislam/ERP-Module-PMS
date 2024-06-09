import { deleteForApproval, updateDataForApproval } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const mutationRentedAssetApproval = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        updateForApproval: builder.mutation({
            query: (payload) => ({
                url: updateDataForApproval,
                method: "PUT",
                body: payload
            })
        }),
        deleteForApproval: builder.mutation({
            query: () => ({
                url: deleteForApproval,
                method: "DELETE"

            })
        })
    })
})

export const {
    useUpdateForApprovalMutation,
    useDeleteForApprovalMutation
} = mutationRentedAssetApproval