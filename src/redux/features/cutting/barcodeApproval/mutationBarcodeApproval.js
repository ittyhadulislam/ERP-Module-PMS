import { barcode_approval, barcode_cancel } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const barcodeApprovalMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    barcodeApproval: builder.mutation({
      query: (data) => ({
        url: barcode_approval,
        method: "PUT",
        body: data,
      }),
    }),
    barcodeCancel: builder.mutation({
      query: (data) => ({
        url: barcode_cancel,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const { useBarcodeApprovalMutation, useBarcodeCancelMutation } =
  barcodeApprovalMutation;
