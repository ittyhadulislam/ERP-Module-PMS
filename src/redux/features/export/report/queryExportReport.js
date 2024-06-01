import {
  get_daily_export_report,
  get_export_style_wise_report,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const exportReportQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDailyExportReport: builder.query({
      query: ({ id, date, user }) =>
        id &&
        date &&
        user && {
          url: `${get_daily_export_report}&comID=${id}&date=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getExportStyleWiseReport: builder.query({
      query: ({ id, style, user }) =>
        id &&
        style &&
        user && {
          //&comID=49&styleID=40025&UserName=w
          url: `${get_export_style_wise_report}&comID=${id}&styleID=${style}&UserName=${user}`,
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
  useLazyGetDailyExportReportQuery,
  useLazyGetExportStyleWiseReportQuery,
} = exportReportQuery;
