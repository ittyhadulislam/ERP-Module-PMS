import {
  get_merchant_approve_by_view,
  get_merchant_check_by_view,
  get_merchant_confirm_by_view,
  get_merchant_dispose_by_view,
  get_merchant_view_details,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const merchantForApproval = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMerchantCheckBy: builder.query({
      query: (id) => `${get_merchant_check_by_view}?comID=${id}`,
    }),
    getMerchantConfirmBy: builder.query({
      query: (id) => `${get_merchant_confirm_by_view}?comID=${id}`,
    }),
    getMerchantApproveBy: builder.query({
      query: (id) => `${get_merchant_approve_by_view}?comID=${id}`,
    }),
    getMerchantDisposeBy: builder.query({
      query: (id) => `${get_merchant_dispose_by_view}?comID=${id}`,
    }),
    getMerchantViewDetails: builder.query({
      query: (id) => `${get_merchant_view_details}?comID=${id}`,
    }),
  }),
});

export const {
  useLazyGetMerchantCheckByQuery,
  useLazyGetMerchantConfirmByQuery,
  useLazyGetMerchantApproveByQuery,
  useLazyGetMerchantDisposeByQuery,
  useLazyGetMerchantViewDetailsQuery,
} = merchantForApproval;
