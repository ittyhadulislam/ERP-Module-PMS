import { updateDataForApproval } from "../../../../apiRoutes/assetManagement";
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
        })
    })
})

export const {
    useUpdateForApprovalMutation
} = mutationRentedAssetApproval