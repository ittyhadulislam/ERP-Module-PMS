import { get_supplier_details, get_supplier_name } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const masterSetupQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSupplierDetails: builder.query({
      query: () => get_supplier_details,
    }),
    getSupplierName: builder.query({
      query: () => get_supplier_name,
    }),
  }),
});

export const { useGetSupplierDetailsQuery, useGetSupplierNameQuery } =
  masterSetupQuery;
