import {
  save_weaving_master_setup_customer,
  weaving_master_setup_buyer,
  weaving_master_setup_color,
  weaving_master_setup_composition,
  weaving_master_setup_construction,
  weaving_master_setup_design,
  weaving_master_setup_dia,
  weaving_master_setup_gsm,
  weaving_master_setup_yarn_count,
  weaving_master_setup_yarn_type,
} from "../../../../apiRoutes/weaving";
import { apiSlice } from "../../../api/apiSlice";

const masterSetupMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveCustomer: builder.mutation({
      query: (data) => ({
        url: save_weaving_master_setup_customer,
        method: "POST",
        body: data,
      }),
    }),
    saveYarnType: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_yarn_type,
        method: "POST",
        body: data,
      }),
    }),
    saveYarnCount: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_yarn_count,
        method: "POST",
        body: data,
      }),
    }),
    saveDia: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_dia,
        method: "POST",
        body: data,
      }),
    }),
    saveComposition: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_composition,
        method: "POST",
        body: data,
      }),
    }),
    saveConstruction: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_construction,
        method: "POST",
        body: data,
      }),
    }),
    saveDesign: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_design,
        method: "POST",
        body: data,
      }),
    }),
    saveGsm: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_gsm,
        method: "POST",
        body: data,
      }),
    }),
    saveBuyer: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_buyer,
        method: "POST",
        body: data,
      }),
    }),
    saveColor: builder.mutation({
      query: (data) => ({
        url: weaving_master_setup_color,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveYarnTypeMutation,
  useSaveYarnCountMutation,
  useSaveDiaMutation,
  useSaveCompositionMutation,
  useSaveConstructionMutation,
  useSaveDesignMutation,
  useSaveGsmMutation,
  useSaveBuyerMutation,
  useSaveColorMutation,
  useSaveCustomerMutation,
} = masterSetupMutation;
