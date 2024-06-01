import { saveRunningRepair } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const mutationRunningRepair = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        saveRunningRepair: builder.mutation({
            query: (payload) => ({
                url: saveRunningRepair,
                method: "POST",
                body: payload
            })
        }),
        //TODO: Delete Api
        deleteRunningRepair: builder.mutation({
            query: (id) => ({
                url: `${"Delete API"}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const {
    useSaveRunningRepairMutation,
    useDeleteRunningRepairMutation
} = mutationRunningRepair