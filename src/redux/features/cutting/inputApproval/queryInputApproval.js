import {
  get_input_approval,
  get_input_approval_report,
  get_input_for_approval,
  get_input_for_approval_report,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const inputApprovalQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getInputForApproval: builder.query({
      query: (id) => id && `${get_input_for_approval}?comID=${id}`,
    }),
    getInputApproval: builder.query({
      query: (id) => id && `${get_input_approval}?comID=${id}`,
    }),
    getInputForApprovalReport: builder.query({
      query: ({ id, challan, user }) =>
        id &&
        challan &&
        user && {
          url: `${get_input_for_approval_report}&comID=${id}&challan=${challan}&UserName=${user}`,

          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getInputApprovalReport: builder.query({
      query: ({ id, challan, user }) =>
        id &&
        challan &&
        user && {
          url: `${get_input_approval_report}&comID=${id}&challan=${challan}&UserName=${user}`,

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
  useGetInputForApprovalQuery,
  useGetInputApprovalQuery,
  useGetInputForApprovalReportQuery,
  useGetInputApprovalReportQuery,
} = inputApprovalQuery;
