import {
  get_export_approval_data,
  get_export_for_approval_data,
  get_export_for_approval_report,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const forApprovalQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getExportForApproval: builder.query({
      query: (id) => id && `${get_export_for_approval_data}?comID=${id}`,
    }),
    getExportReport: builder.query({
      query: ({ id, expId, user }) =>
        id &&
        expId &&
        user && {
          url: `${get_export_for_approval_report}&comID=${id}&expID=${expId}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getExportApproval: builder.query({
      query: (id) => id && `${get_export_approval_data}?comID=${id}`,
    }),
  }),
});

export const {
  useGetExportForApprovalQuery,
  useGetExportReportQuery,
  useLazyGetExportReportQuery,
  useGetExportApprovalQuery,
} = forApprovalQuery;
