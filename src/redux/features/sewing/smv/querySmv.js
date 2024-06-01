import {
  get_smv_buyer,
  get_smv_style,
  get_smv_styleIfo_for_SMV,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const smvQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSmvBuyer: builder.query({
      query: () => `${get_smv_buyer}`,
    }),
    getSmvStyle: builder.query({
      query: (id) => id && `${get_smv_style}?buyerID=${id}`,
    }),
    getSmvStyleInfoForSmv: builder.query({
      query: ({ buyerId, styleId }) =>
        buyerId &&
        styleId &&
        `${get_smv_styleIfo_for_SMV}?buyerID=${buyerId}&styleID=${styleId}`,
    }),
  }),
});

export const {
  useGetSmvBuyerQuery,
  useGetSmvStyleQuery,
  useGetSmvStyleInfoForSmvQuery,
} = smvQuery;
