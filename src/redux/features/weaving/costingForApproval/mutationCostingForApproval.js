import {
  approve_IA_approval,
  approve_MD_data,
  approve_costing_approval,
  approve_dmm_approval,
  approve_gm_approval,
} from "../../../../apiRoutes/weaving";
import { apiSlice } from "../../../api/apiSlice";

const costingForApprovalMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    approveCosting: builder.mutation({
      query: (data) => ({
        url: approve_costing_approval,
        method: "PUT",
        body: data,
      }),
    }),
    approveDmm: builder.mutation({
      query: (data) => ({
        url: approve_dmm_approval,
        method: "PUT",
        body: data,
      }),
    }),
    approveGm: builder.mutation({
      query: (data) => ({
        url: approve_gm_approval,
        method: "PUT",
        body: data,
      }),
    }),
    approveIa: builder.mutation({
      query: (data) => ({
        url: approve_IA_approval,
        method: "PUT",
        body: data,
      }),
    }),  approveMD: builder.mutation({
      query: (data) => ({
        url: approve_MD_data,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useApproveCostingMutation,
  useApproveDmmMutation,
  useApproveGmMutation,
  useApproveIaMutation,
  useApproveMDMutation
} = costingForApprovalMutation;
