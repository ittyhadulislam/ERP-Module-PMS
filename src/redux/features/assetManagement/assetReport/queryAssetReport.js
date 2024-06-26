import { apiSlice } from './../../../api/apiSlice';
import { getReportBlobs } from '../../../../utils/getReportBlobs';
import {
    getAssetDetailMasterReport,
    getAssetDetailsSummaryReport,
    getAssetInformationDetails,
    getAssetManagementReport,
    getAssetSummaryReport,
    getExternalReport,
    getInternalReport,
    getRentedAssetReport,
    getRunningReport,
    getScheduleMaintenanceReport
} from './../../../../apiRoutes/assetManagement';

const queryAssetReport = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getAssetManagementReport: builder.query({
            query: ({ comID, userName, floorID, lineID, status, assetCategory, fromDate, toDate }) => ({
                // url: `${getAssetManagementReport}?reportType=pdf&comID=${comID}&UserName=${userName}`,
                url: `${getAssetManagementReport}?reportType=pdf&ComID=${comID}&UserName=${userName}&floor=${floorID}&Line=${lineID}&status=${status}&AssetCetagory=${assetCategory}&FromDate=${fromDate}&ToDate=${toDate}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                }
            })
        }),
        getAssetInformationDetailsReport: builder.query({
            query: ({ comID, userName, floorID, lineID, status, assetCategory, fromDate, toDate }) => ({
                url: `${getAssetInformationDetails}?reportType=pdf&ComID=${comID}&UserName=${userName}&floor=${floorID}&Line=${lineID}&status=${status}&AssetCetagory=${assetCategory}&FromDate=${fromDate}&ToDate=${toDate}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                }
            })
        }),
        getAssetDetailsSummaryReport: builder.query({
            query: ({ comID, userName, floorID, lineID, status, assetCategory, fromDate, toDate }) => ({
                // url: `${getAssetDetailsSummaryReport}?reportType=pdf&comID=${comID}&UserName=${userName}`,
                url: `${getAssetDetailsSummaryReport}?reportType=pdf&ComID=${comID}&UserName=${userName}&floor=${floorID}&Line=${lineID}&status=${status}&AssetCetagory=${assetCategory}&FromDate=${fromDate}&ToDate=${toDate}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                },
            }),
        }),
        getAssetSummaryReport: builder.query({
            query: ({ comID, userName }) => ({
                url: `${getAssetSummaryReport}?reportType=pdf&comID=${comID}&UserName=${userName}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                },
            }),
        }),
        getAssetRunningRepairReport: builder.query({
            query: ({ comID, userName, floorID, lineID, fromDate, toDate }) => ({
                // url: `${getRunningReport}?reportType=pdf&comID=${comID}&UserName=${userName}`,
                url: `${getRunningReport}?reportType=pdf&ComID=${comID}&UserName=${userName}&floor=${floorID}&Line=${lineID}&FromDate=${fromDate}&ToDate=${toDate}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                },
            }),
        }),
        getInternalTransferReport: builder.query({
            query: ({ comID, userName }) => ({
                url: `${getInternalReport}?reportType=pdf&comID=${comID}&UserName=${userName}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                },
            }),
        }),
        getExternalTransferReport: builder.query({
            query: ({ fromCom, toCom, userName }) => ({
                url: `${getExternalReport}?reportType=pdf&fromComId=${fromCom}&toComId=${toCom}&UserName=${userName}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                },
            }),
        }),
        getRentedAssetDetailsReport: builder.query({
            query: ({ comID, userName }) => ({
                // url: `${getRentedAssetReport}?reportType=pdf&ComID=${comID}&UserName=${userName}`,
                url: `${getRentedAssetReport}?reportType=pdf&ComID=${comID}&UserName=${userName}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                },
            }),
        }),
        getAssetDetailsMasterReport: builder.query({
            query: ({ comID, userName, floorID, lineID, status, assetCategory, fromDate, toDate }) => ({
                // url: `${getAssetDetailMasterReport}?reportType=pdf&ComID=${comID}&UserName=${userName}`,
                url: `${getAssetDetailMasterReport}?reportType=pdf&ComID=${comID}&UserName=${userName}&floor=${floorID}&Line=${lineID}&status=${status}&AssetCetagory=${assetCategory}&FromDate=${fromDate}&ToDate=${toDate}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                },
            }),
        }),
        getScheduleMaintenanceReport: builder.query({
            query: ({ comID, userName, floorID, lineID, fromDate, toDate }) => ({
                url: `${getScheduleMaintenanceReport}?reportType=pdf&comID=${comID}&UserName=${userName}&floor=${floorID}&Line=${lineID}&FromDate=${fromDate}&ToDate=${toDate}`,
                responseHandler: async (response) => {
                    return getReportBlobs(response, "pdf");
                },
            }),
        }),
    })
})

export const {
    useLazyGetAssetManagementReportQuery,
    useLazyGetAssetInformationDetailsReportQuery,
    useLazyGetAssetDetailsSummaryReportQuery,
    useLazyGetAssetSummaryReportQuery,
    useLazyGetAssetRunningRepairReportQuery,
    useLazyGetInternalTransferReportQuery,
    useLazyGetExternalTransferReportQuery,
    useLazyGetRentedAssetDetailsReportQuery,
    useLazyGetAssetDetailsMasterReportQuery,
    useLazyGetScheduleMaintenanceReportQuery
} = queryAssetReport
