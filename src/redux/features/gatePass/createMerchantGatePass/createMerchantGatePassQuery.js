import {
  get_merchant_gate_pass_add_view,
  get_merchant_gate_pass_add_view_details,
  get_merchant_gate_pass_add_view_report,
  get_merchant_gate_pass_buyer,
  get_merchant_gate_pass_deliver_to,
  get_merchant_gate_pass_delivery_destination,
  get_merchant_gate_pass_item_type,
  get_merchant_gate_pass_item_type_view,
  get_merchant_gate_pass_style,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const merchantGatePassQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBuyer: builder.query({
      query: () => get_merchant_gate_pass_buyer,
    }),
    getStyle: builder.query({
      query: (id) => `${get_merchant_gate_pass_style}?buyerID=${id}`,
    }),
    getItem: builder.query({
      query: () => get_merchant_gate_pass_item_type,
    }),
    getDeliverTo: builder.query({
      query: () => get_merchant_gate_pass_deliver_to,
    }),
    getAddView: builder.query({
      query: (user) => `${get_merchant_gate_pass_add_view}?UserName=${user}`,
    }),
    getAddViewDetails: builder.query({
      query: ({ id, user }) =>
        id &&
        user &&
        `${get_merchant_gate_pass_add_view_details}?comID=${id}&UserName=${user}`,
    }),
    getMerchantAddViewReport: builder.query({
      query: (
        { id, gpNo, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        gpNo &&
        user && {
          url: `${get_merchant_gate_pass_add_view_report}&comID=${id}&gpNo=${gpNo}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),

    // destination query
    getDestinationView: builder.query({
      query: () => get_merchant_gate_pass_delivery_destination,
    }),
    // item type
    getItemTypeView: builder.query({
      query: () => get_merchant_gate_pass_item_type_view,
    }),
  }),
});

export const {
  useGetBuyerQuery,
  useLazyGetStyleQuery,
  useGetItemQuery,
  useGetDeliverToQuery,
  useGetAddViewQuery,
  useGetAddViewDetailsQuery,
  useLazyGetMerchantAddViewReportQuery,
  useGetDestinationViewQuery,
  useGetItemTypeViewQuery,
} = merchantGatePassQuery;
