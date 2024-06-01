import {
  gate_pass_merchant_report_daily,
  gate_pass_merchant_report_date_to_data,
  gate_pass_merchant_report_return_date_to_data,
  gate_pass_merchant_report_return_dpt_status,
  gate_pass_merchant_report_style_wise,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const gatePassMerchantReportQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getGatePassMerchantDailyReport: builder.query({
      query: (
        { id, date, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        date &&
        user && {
          url: `${gate_pass_merchant_report_daily}&comID=${id}&date=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getGatePassMerchantDateToDateReport: builder.query({
      query: (
        { id, fromDate, toDate, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        fromDate &&
        toDate &&
        user && {
          url: `${gate_pass_merchant_report_date_to_data}&comID=${id}&fdate=${fromDate}&tdate=${toDate}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getGatePassMerchantReturnDateToDateReport: builder.query({
      query: (
        { id, fromDate, toDate, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        fromDate &&
        toDate &&
        user && {
          url: `${gate_pass_merchant_report_return_date_to_data}&comID=${id}&fdate=${fromDate}&tdate=${toDate}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getGatePassMerchantReturnDPTStatusReport: builder.query({
      query: (
        { id, department, status, fromDate, toDate, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        department &&
        status &&
        fromDate &&
        toDate &&
        user && {
          url: `${gate_pass_merchant_report_return_dpt_status}&comID=${id}&dept=${department}&status=${status}&fdate=${fromDate}&tdate=${toDate}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getGatePassMerchantStyleWiseReport: builder.query({
      query: (
        { id, buyer, style, user } //comID=49&buyer=1&style=1&UserName=1
      ) =>
        id &&
        buyer &&
        style &&
        user && {
          url: `${gate_pass_merchant_report_style_wise}&comID=${id}&buyer=${buyer}&style=${style}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
  }),
});

export const {
  useLazyGetGatePassMerchantDailyReportQuery,
  useLazyGetGatePassMerchantDateToDateReportQuery,
  useLazyGetGatePassMerchantReturnDateToDateReportQuery,
  useLazyGetGatePassMerchantReturnDPTStatusReportQuery,
  useLazyGetGatePassMerchantStyleWiseReportQuery,
} = gatePassMerchantReportQuery;
