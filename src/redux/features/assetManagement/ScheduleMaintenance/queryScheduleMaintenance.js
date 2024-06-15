import { apiSlice } from "../../../api/apiSlice";
import {
    getAssetNoScheduleMaintenance,
    getDetailsBasedOnAssetNoScheduleMaintenance,
    getServiceType
} from "../../../../apiRoutes/assetManagement";

const queryScheduleMaintenance = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getAssetNoScheduleMaintenance: builder.query({
            query: () => `${getAssetNoScheduleMaintenance}`
        }),
        getDetailsBasedOnAssetNoForScheduleMaintenance: builder.query({
            query: (assetNo) => `${getDetailsBasedOnAssetNoScheduleMaintenance}?AsstNo=${assetNo}`
        }),
        getServiceType: builder.query({
            query: () => `${getServiceType}`
        })
    })
})

export const {
    useGetAssetNoScheduleMaintenanceQuery,
    useLazyGetDetailsBasedOnAssetNoForScheduleMaintenanceQuery,
    useGetServiceTypeQuery
} = queryScheduleMaintenance