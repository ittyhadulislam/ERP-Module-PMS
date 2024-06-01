import { saveAsset, updateAsset } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";


const assetMasterMutation = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        saveAssetMasterDetails: builder.mutation({
            query: (payload) => ({
                // console.log(data),
                url: saveAsset,
                method: "POST",
                body: payload,
            }),
        }),
        updateAssetMasterDetails: builder.mutation({
            query: (data) => ({
                url: updateAsset,
                method: "PUT",
                body: data,
            }),
        }),
    })
})

export const { useSaveAssetMasterDetailsMutation, useUpdateAssetMasterDetailsMutation } = assetMasterMutation