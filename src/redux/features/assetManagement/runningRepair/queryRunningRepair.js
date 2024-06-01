import { getAssetNoRunningRepair, getDetailsBasedOnAssetNoRunningRepair, getViewInTableRunningRepair } from '../../../../apiRoutes/assetManagement';
import { apiSlice } from './../../../api/apiSlice';

const queryRunningRepair = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getAssetNoForRunningRepair: builder.query({
            query: () => `${getAssetNoRunningRepair}`
        }),
        getDetailsBasedOnAssetNoForRunningRepair: builder.query({
            query: (assetNo) => assetNo && `${getDetailsBasedOnAssetNoRunningRepair}?AsstNo=${assetNo}`
        }),
        getViewForRunningRepair: builder.query({
            query: () => `${getViewInTableRunningRepair}`
        })
    })
})

export const {
    useGetAssetNoForRunningRepairQuery,
    useLazyGetDetailsBasedOnAssetNoForRunningRepairQuery,
    useGetViewForRunningRepairQuery,
} = queryRunningRepair