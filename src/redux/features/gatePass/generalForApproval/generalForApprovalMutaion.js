import {
  approve_general_for_approval,
  cancel_general_for_approval,
  check_by_general_for_approval,
  confirm_general_for_approval,
  dispose_general_for_approval,
  return_general_for_approval,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const generalForApprovalMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    check: builder.mutation({
      query: (data) => ({
        url: `${check_by_general_for_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    checkByReturn: builder.mutation({
      query: (data) => ({
        url: `${return_general_for_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    cancel: builder.mutation({
      query: (data) => ({
        url: `${cancel_general_for_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    confirm: builder.mutation({
      query: (data) => ({
        url: `${confirm_general_for_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    approve: builder.mutation({
      query: (data) => ({
        url: `${approve_general_for_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    dispose: builder.mutation({
      query: (data) => ({
        url: `${dispose_general_for_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCheckMutation,
  useCheckByReturnMutation,
  useCancelMutation,
  useConfirmMutation,
  useApproveMutation,
  useDisposeMutation,
} = generalForApprovalMutation;
