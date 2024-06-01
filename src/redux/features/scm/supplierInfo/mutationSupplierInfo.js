import {
  supplier_info_approved,
  supplier_info_for_approval,
  supplier_info_save,
  supplier_info_update,
  supplier_info_update_step2,
  supplier_info_update_step3,
  supplier_info_update_step4,
  supplier_info_update_step5,
  supplier_info_update_step6,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const mutationSupplierInfo = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveSupplier: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_save}`,
        method: "POST",
        body: data,
      }),
    }),
    updateSupplier: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_update}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateSupplierStep2: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_update_step2}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateSupplierStep3: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_update_step3}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateSupplierStep4: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_update_step4}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateSupplierStep5: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_update_step5}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateSupplierStep6: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_update_step6}`,
        method: "PUT",
        body: data,
      }),
    }),
    supplierForApproval: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_for_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    supplierForApproved: builder.mutation({
      query: (data) => ({
        url: `${supplier_info_approved}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveSupplierMutation,
  useUpdateSupplierMutation,
  useUpdateSupplierStep2Mutation,
  useUpdateSupplierStep3Mutation,
  useUpdateSupplierStep4Mutation,
  useUpdateSupplierStep5Mutation,
  useUpdateSupplierStep6Mutation,
  useSupplierForApprovalMutation,
  useSupplierForApprovedMutation,
} = mutationSupplierInfo;
