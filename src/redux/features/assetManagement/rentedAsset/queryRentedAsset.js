import {
    getAssetCategoryRentedAsset,
    getAssetSpecialFeatureRentedAsset,
    getAssetStatusRentedAsset,
    getBrandRentedAsset,
    getCurrencyRentedAsset,
    getCurrentHolderForRentedAsset,
    getFloorRentedAsset,
    getLineRentedAsset,
    getMachineNameRentedAsset,
    getSupplierRentedAsset,
    getViewRentedAsset,
} from "../../../../apiRoutes/assetManagement";
import { apiSlice } from "../../../api/apiSlice";

const rentedAssetQuery = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getCurrentHolderForRentedAsset: builder.query({
            query: () => `${getCurrentHolderForRentedAsset}`
        }),
        getFloorForRentedAsset: builder.query({
            query: (comID) => comID && `${getFloorRentedAsset}?comID=${comID}`
        }),
        getLineForRentedAsset: builder.query({
            query: ({ comID, floorID }) => comID && floorID && `${getLineRentedAsset}?comID=${comID}&floorID=${floorID}`
        }),
        getAssetCategoryForRentedAsset: builder.query({
            query: () => `${getAssetCategoryRentedAsset}`
        }),
        getAssetSpacialFeature: builder.query({
            query: () => `${getAssetSpecialFeatureRentedAsset}`
        }),
        getAssetStatusForRentedAsset: builder.query({
            query: () => `${getAssetStatusRentedAsset}`
        }),
        getAssetNameForRentedAsset: builder.query({
            query: () => `${getMachineNameRentedAsset}`
        }),
        getBrandForRentedAsset: builder.query({
            query: () => `${getBrandRentedAsset}`
        }),
        getSupplierForRentedAsset: builder.query({
            query: () => `${getSupplierRentedAsset}`
        }),
        getCurrencyForRentedAsset: builder.query({
            query: () => `${getCurrencyRentedAsset}`
        }),
        getViewForRentedAsset: builder.query({
            query: (payload) => payload && `${getViewRentedAsset}?AssetNO=${payload.AssetNo}`
        })
    })
})

export const {
    useGetCurrentHolderForRentedAssetQuery,
    useLazyGetFloorForRentedAssetQuery,
    useLazyGetLineForRentedAssetQuery,
    useGetAssetCategoryForRentedAssetQuery,
    useGetAssetSpacialFeatureQuery,
    useGetAssetStatusForRentedAssetQuery,
    useGetAssetNameForRentedAssetQuery,
    useGetBrandForRentedAssetQuery,
    useGetSupplierForRentedAssetQuery,
    useGetCurrencyForRentedAssetQuery,
    useLazyGetViewForRentedAssetQuery,
} = rentedAssetQuery