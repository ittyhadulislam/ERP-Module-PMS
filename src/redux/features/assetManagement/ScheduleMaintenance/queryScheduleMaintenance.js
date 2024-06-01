import { apiSlice } from "../../../api/apiSlice";
import {
    getAssetNoScheduleMaintenance,
    getDetailsBasedOnAssetNoScheduleMaintenance
} from "../../../../apiRoutes/assetManagement";

const queryScheduleMaintenance = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getAssetNoScheduleMaintenance: builder.query({
            query: () => `${getAssetNoScheduleMaintenance}`
        }),
        getDetailsBasedOnAssetNoForScheduleMaintenance: builder.query({
            query: (assetNo) => `${getDetailsBasedOnAssetNoScheduleMaintenance}?AsstNo=${assetNo}`
        })
    })
})

export const {
    useGetAssetNoScheduleMaintenanceQuery,
    useLazyGetDetailsBasedOnAssetNoForScheduleMaintenanceQuery,
} = queryScheduleMaintenance