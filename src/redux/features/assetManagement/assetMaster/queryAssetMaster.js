import { apiSlice } from "../../../api/apiSlice";
import {
    getAssetCategory,
    getAssetList,
    getAssetSpecialFeature,
    getAssetStatus,
    getBrand,
    getCompany,
    getCurrency,
    getCurrentHolder,
    getDepartment,
    getFloor, getLine,
    getMachineName,
    getSection,
    getSupplierName,
    getViewList
} from './../../../../apiRoutes/assetManagement';

const assetMasterQuery = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: () => `${getCompany}`,
        }),
        getDepartments: builder.query({
            query: (comId) => comId && `${getDepartment}?comID=${comId}`
        }),
        getSections: builder.query({
            query: ({ comID, DeptID }) => comID && DeptID && `${getSection}?comID=${comID}&DeptID=${DeptID}`
        }),
        getFloor: builder.query({
            query: (comID) => comID && `${getFloor}?comID=${comID}`
        }),
        getLine: builder.query({
            query: ({ comID, floorID }) => comID && floorID && `${getLine}?comID=${comID}&floorID=${floorID}`
        }),
        getAssetCategory: builder.query({
            query: () => `${getAssetCategory}`
        }),
        getAssetSpecialFeature: builder.query({
            query: () => `${getAssetSpecialFeature}`
        }),
        getAssetStatus: builder.query({
            query: () => `${getAssetStatus}`
        }),
        getMachineName: builder.query({
            query: () => `${getMachineName}`
        }),
        getSupplierName: builder.query({
            query: () => `${getSupplierName}`
        }),
        getBrand: builder.query({
            query: () => `${getBrand}`
        }),
        getCurrency: builder.query({
            query: () => `${getCurrency}`
        }),
        getCurrentHolder: builder.query({
            query: () => `${getCurrentHolder}`
        }),
        getView: builder.query({
            query: (payload) => payload && `${getAssetList}?AsstNo=${payload?.AsstNo}`
        })
    })
})

export const {
    useGetCompanyQuery,
    useLazyGetDepartmentsQuery,
    useLazyGetSectionsQuery,
    useLazyGetFloorQuery,
    useLazyGetLineQuery,
    useGetAssetCategoryQuery,
    useGetAssetSpecialFeatureQuery,
    useGetAssetStatusQuery,
    useGetMachineNameQuery,
    useGetSupplierNameQuery,
    useGetBrandQuery,
    useGetCurrencyQuery,
    useGetCurrentHolderQuery,
    useLazyGetViewQuery,
} = assetMasterQuery