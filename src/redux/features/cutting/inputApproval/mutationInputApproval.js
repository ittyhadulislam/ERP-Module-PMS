import { input_approval, input_cancel } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const inputApprovalMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    inputApproval: builder.mutation({
      query: (data) => ({
        url: input_approval,
        method: "PUT",
        body: data,
      }),
    }),
    inputCancel: builder.mutation({
      query: (data) => ({
        url: input_cancel,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const { useInputApprovalMutation, useInputCancelMutation } =
  inputApprovalMutation;
