import {
  get_barcode_approval,
  get_barcode_for_approval,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const barcodeApprovalQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBarcodeForApproval: builder.query({
      query: (id) => id && `${get_barcode_for_approval}?comID=${id}`,
    }),
    getBarcodeApproval: builder.query({
      query: (id) => id && `${get_barcode_approval}?comID=${id}`,
    }),
  }),
});

export const { useGetBarcodeForApprovalQuery, useGetBarcodeApprovalQuery } =
  barcodeApprovalQuery;
