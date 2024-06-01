import {
  get_general_approve_by_view,
  get_general_check_by_view,
  get_general_confirm_by_view,
  get_general_dispose_by_view,
  get_general_gift_approve_by_view,
  get_general_view_details,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const generalForApproval = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCheckBy: builder.query({
      query: (id) => `${get_general_check_by_view}?comID=${id}`,
    }),
    getConfirmBy: builder.query({
      query: (id) => `${get_general_confirm_by_view}?comID=${id}`,
    }),
    getApproveBy: builder.query({
      query: (id) => `${get_general_approve_by_view}?comID=${id}`,
    }),
    getGiftApproveBy: builder.query({
      query: (id) => `${get_general_gift_approve_by_view}?comID=${id}`,
    }),
    getDisposeBy: builder.query({
      query: (id) => `${get_general_dispose_by_view}?comID=${id}`,
    }),
    getViewDetails: builder.query({
      query: (id) => `${get_general_view_details}?comID=${id}`,
    }),
  }),
});

export const {
  useGetCheckByQuery,
  useGetConfirmByQuery,
  useGetApproveByQuery,
  useGetGiftApproveByQuery,
  useGetDisposeByQuery,
  useGetViewDetailsQuery,
} = generalForApproval;
