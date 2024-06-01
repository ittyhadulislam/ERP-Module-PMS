import {
  get_IA_data,
  get_MD_data,
  get_dmm_data,
  get_gm_data,
  get_scm_data,
  get_weaving_for_approval_report,
  get_weaving_for_approval_view,
} from "../../../../apiRoutes/weaving";
import { apiSlice } from "../../../api/apiSlice";

const costingForApproval = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCostingForApprovalView: builder.query({
      query: () => get_weaving_for_approval_view,
    }),

    getCostingForApprovalReport: builder.query({
      query: ({ OrderID, user }) =>
        OrderID &&
        user && {
          url: `${get_weaving_for_approval_report}&OrderID=${OrderID}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getCostingSCMView: builder.query({
      query: () => get_scm_data,
    }),
    getCostingDMMView: builder.query({
      query: () => get_dmm_data,
    }),
    getCostingGMView: builder.query({
      query: () => get_gm_data,
    }),getCostingIAView: builder.query({
      query: () => get_IA_data,
    }),getCostingMDView: builder.query({
      query: () => get_MD_data,
    }),
  }),
});

export const {
  useGetCostingForApprovalViewQuery,
  useLazyGetCostingForApprovalReportQuery,
  useGetCostingSCMViewQuery,
  useGetCostingDMMViewQuery,
  useGetCostingGMViewQuery,
  useGetCostingIAViewQuery,
  useGetCostingMDViewQuery
} = costingForApproval;
