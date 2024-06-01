import { approve_export_data, cancel_export_data } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const forApprovalMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    exportForApproval: builder.mutation({
      query: (data) => ({
        url: approve_export_data,
        method: "PUT",
        body: data,
      }),
    }),
    exportForApprovalCancel: builder.mutation({
      query: (data) => ({
        url: cancel_export_data,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useExportForApprovalMutation,
  useExportForApprovalCancelMutation,
} = forApprovalMutation;
