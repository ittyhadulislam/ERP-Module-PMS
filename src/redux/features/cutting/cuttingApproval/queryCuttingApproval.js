import {
  cutting_approval_report,
  cutting_approved_view,
  cutting_for_approval_view,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const cuttingApprovalQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCuttingApprovalView: builder.query({
      query: (id) => id && `${cutting_for_approval_view}?comID=${id}`,
    }),
    getCuttingApprovedView: builder.query({
      query: (id) => id && `${cutting_approved_view}?comID=${id}`,
    }),
    getCuttingReport: builder.query({
      query: ({ style, cut, lay, comID, user }) =>
        style &&
        comID &&
        cut &&
        lay &&
        user && {
          url: `${cutting_approval_report}&style=${style}&cut=${cut}&lay=${lay}&comID=${comID}&userName=${user}`,
          // transformResponse: (response) => {
          //   return response.blob(); // Set the responseType to 'blob'
          // },
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
  useGetCuttingApprovalViewQuery,
  useGetCuttingApprovedViewQuery,
  useGetCuttingReportQuery,
} = cuttingApprovalQuery;
