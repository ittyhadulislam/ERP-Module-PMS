import { saveScheduleMaintenance } from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const mutationScheduleMaintenance = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        scheduleMaintenanceSave: builder.mutation({
            query: (payload) => ({
                url: saveScheduleMaintenance,
                method: 'POST',
                body: payload
            })
        })
    })
})

export const {
    useScheduleMaintenanceSaveMutation
} = mutationScheduleMaintenance