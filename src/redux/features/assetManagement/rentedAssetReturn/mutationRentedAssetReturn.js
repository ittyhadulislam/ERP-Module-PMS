import { saveRentedAssetReturnComplete, saveRentedReturnAdd } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const mutationRentedAssetReturn = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        updateDataInTable1ForRentedAssetReturnAdd: builder.mutation({
            query: (payload) => ({
                url: saveRentedReturnAdd,
                method: "PUT",
                body: payload
            })
        }),
        updateDataInTableForRentedAssetReturnComplete: builder.mutation({
            query: (payload) => ({
                url: saveRentedAssetReturnComplete,
                method: "PUT",
                body: payload
            })
        })
    })
})

export const {
    useUpdateDataInTable1ForRentedAssetReturnAddMutation,
    useUpdateDataInTableForRentedAssetReturnCompleteMutation
} = mutationRentedAssetReturn