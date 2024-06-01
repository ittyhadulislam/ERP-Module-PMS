import {
  gate_pass_general_report_daily,
  gate_pass_general_report_date_to_data,
  gate_pass_general_report_return_date_to_data,
  gate_pass_general_report_return_dpt_status,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const gatePassReportQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getGatePassDailyReport: builder.query({
      query: (
        { id, date, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        date &&
        user && {
          url: `${gate_pass_general_report_daily}&comID=${id}&date=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getGatePassDateToDateReport: builder.query({
      query: (
        { id, fromDate, toDate, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        fromDate &&
        toDate &&
        user && {
          url: `${gate_pass_general_report_date_to_data}&comID=${id}&fdate=${fromDate}&tdate=${toDate}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getGatePassReturnDateToDateReport: builder.query({
      query: (
        { id, fromDate, toDate, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        fromDate &&
        toDate &&
        user && {
          url: `${gate_pass_general_report_return_date_to_data}&comID=${id}&fdate=${fromDate}&tdate=${toDate}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getGatePassReturnDPTStatusReport: builder.query({
      query: (
        { id, department, status, fromDate, toDate, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        department &&
        status &&
        fromDate &&
        toDate &&
        user && {
          url: `${gate_pass_general_report_return_dpt_status}&comID=${id}&dept=${department}&status=${status}&fdate=${fromDate}&tdate=${toDate}&UserName=${user}`,
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
  useLazyGetGatePassDailyReportQuery,
  useLazyGetGatePassDateToDateReportQuery,
  useLazyGetGatePassReturnDateToDateReportQuery,
  useLazyGetGatePassReturnDPTStatusReportQuery,
} = gatePassReportQuery;
