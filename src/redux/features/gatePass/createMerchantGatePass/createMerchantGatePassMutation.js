import {
  cancel_merchant_item_type,
  complete_merchant_gate_pass_data,
  delete_merchant_gate_pass_data,
  save_merchant_delivery_information,
  save_merchant_gate_pass_data,
  save_merchant_item_type,
  update_merchant_delivery_information,
  update_merchant_item_type,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const merchantGatePassMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveMerchantGatePass: builder.mutation({
      query: (data) => ({
        url: save_merchant_gate_pass_data,
        method: "POST",
        body: data,
      }),
    }),
    deleteMerchantGatePass: builder.mutation({
      query: (id) => ({
        url: `${delete_merchant_gate_pass_data}?refID=${id}`,
        method: "DELETE",
      }),
    }),
    completeMerchantGatePass: builder.mutation({
      query: (data) => ({
        url: `${complete_merchant_gate_pass_data}`,
        method: "PUT",
        body: data,
      }),
    }),
    saveDeliveryDetails: builder.mutation({
      query: (data) => ({
        url: `${save_merchant_delivery_information}`,
        method: "POST",
        body: data,
      }),
    }),
    updateDeliveryDetails: builder.mutation({
      query: (data) => ({
        url: `${update_merchant_delivery_information}`,
        method: "PUT",
        body: data,
      }),
    }),
    saveItemType: builder.mutation({
      query: (data) => ({
        url: `${save_merchant_item_type}`,
        method: "POST",
        body: data,
      }),
    }),
    updateItemType: builder.mutation({
      query: (data) => ({
        url: `${update_merchant_item_type}`,
        method: "PUT",
        body: data,
      }),
    }),
    cancelGatePassBtn: builder.mutation({
      query: (data) => ({
        url: `${cancel_merchant_item_type}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useDeleteMerchantGatePassMutation,
  useSaveMerchantGatePassMutation,
  useCompleteMerchantGatePassMutation,
  useSaveDeliveryDetailsMutation,
  useUpdateDeliveryDetailsMutation,
  useSaveItemTypeMutation,
  useUpdateItemTypeMutation,
  useCancelGatePassBtnMutation,
} = merchantGatePassMutation;
