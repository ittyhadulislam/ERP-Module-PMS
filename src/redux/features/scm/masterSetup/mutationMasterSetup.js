import {
  create_and_update_supplier,
  generate_supplier_code,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const masterSetupMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveAndUpdate: builder.mutation({
      query: (data) => ({
        url: create_and_update_supplier,
        method: "POST",
        body: data,
      }),
    }),
    saveSupplierCode: builder.mutation({
      query: (data) => ({
        url: generate_supplier_code,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveAndUpdateMutation, useSaveSupplierCodeMutation } =
  masterSetupMutation;
