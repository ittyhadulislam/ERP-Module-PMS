import {
    getCompanyFixedAssetTransfer,
    getExternalAssetNoFixedAssetTransfer,
    getFloorFixedAssetTransfer,
    getInternalAssetNoFixedAssetTransfer,
    getLineFixedAssetTransfer,
    getViewListExternalFixedAssetTransfer,
    getViewListInternalFixedAssetTransfer
} from '../../../../apiRoutes/assetManagement';

import { apiSlice } from './../../../api/apiSlice';

const queryFixedAssetTransfer = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getCompanyForFixedAssetTransfer: builder.query({
            query: () => `${getCompanyFixedAssetTransfer}`
        }),
        getFloorForFixedAssetTransfer: builder.query({
            query: (comID) => `${getFloorFixedAssetTransfer}?ComID=${comID}`
        }),
        getLineForFixedAssetTransfer: builder.query({
            query: ({ comID, floorID }) => `${getLineFixedAssetTransfer}?ComID=${comID}&floorID=${floorID}`
        }),
        getAssetNoForFixedAssetTransferInternal: builder.query({
            query: ({ comID, floorID, lineID }) => `${getInternalAssetNoFixedAssetTransfer}?ComID=${comID}&floorID=${floorID}&LineID=${lineID}`
        }),
        getAssetNoForFixedAssetTransferExternal: builder.query({
            query: (comID) => `${getExternalAssetNoFixedAssetTransfer}?ComID=${comID}`
        }),
        getViewListInternal: builder.query({
            query: (payload) => `${getViewListInternalFixedAssetTransfer}?ComID=${payload.comID}`
        }),
        getViewListExternal: builder.query({
            query: (payload) => `${getViewListExternalFixedAssetTransfer}?ComID=${payload.comID}`
        })
    })
})

export const {
    useGetCompanyForFixedAssetTransferQuery,
    useLazyGetFloorForFixedAssetTransferQuery,
    useLazyGetLineForFixedAssetTransferQuery,
    useLazyGetAssetNoForFixedAssetTransferInternalQuery,
    useLazyGetAssetNoForFixedAssetTransferExternalQuery,
    useLazyGetViewListInternalQuery,
    useLazyGetViewListExternalQuery,
} = queryFixedAssetTransfer
