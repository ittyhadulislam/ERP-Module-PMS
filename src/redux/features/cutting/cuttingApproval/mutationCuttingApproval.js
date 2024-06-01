import { cancel_cutting, cutting_approval } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const cuttingApprovalMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    cuttingApprove: builder.mutation({
      query: (data) => ({
        url: cutting_approval,
        method: "POST",
        body: data,
      }),
    }),
    cancelCutting: builder.mutation({
      query: (data) => ({
        url: cancel_cutting,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const { useCuttingApproveMutation, useCancelCuttingMutation } =
  cuttingApprovalMutation;
