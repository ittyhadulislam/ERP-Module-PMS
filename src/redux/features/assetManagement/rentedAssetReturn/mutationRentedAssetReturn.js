import { saveRentedAssetReturn } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const mutationRentedAssetReturn = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        updateDataInTable1ForRentedAssetReturn: builder.mutation({
            query: (payload) => ({
                url: saveRentedAssetReturn,
                method: "PUT",
                body: payload
            })
        })
    })
})

export const {
    useUpdateDataInTable1ForRentedAssetReturnMutation,
} = mutationRentedAssetReturn