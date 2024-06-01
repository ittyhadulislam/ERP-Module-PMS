import { apiSlice } from "../../../api/apiSlice";
import { saveAssetMasterExternal, saveAssetMasterInternal } from "../../../../apiRoutes/assetManagement";

const fixedAssetTransferMutation = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        saveFixedAssetTransferInternal: builder.mutation({
            query: (payload) => ({
                url: saveAssetMasterInternal,
                method: "POST",
                body: payload
            })
        }),
        saveFixedAssetTransferExternal: builder.mutation({
            query: (payload) => ({
                url: saveAssetMasterExternal,
                method: "POST",
                body: payload
            })
        })
    })
})

export const {
    useSaveFixedAssetTransferInternalMutation,
    useSaveFixedAssetTransferExternalMutation
} = fixedAssetTransferMutation