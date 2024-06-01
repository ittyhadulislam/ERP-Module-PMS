import { saveRentedAsset, updateRentedAsset } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const rentedAssetMutation = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        saveRentedAsset: builder.mutation({
            query: (payload) => ({
                url: saveRentedAsset,
                method: 'POST',
                body: payload
            })
        }),
        updateRentedAsset: builder.mutation({
            query: (payload) => ({
                url: updateRentedAsset,
                method: 'PUT',
                body: payload
            })
        })
    })
})

export const { useSaveRentedAssetMutation, useUpdateRentedAssetMutation } = rentedAssetMutation