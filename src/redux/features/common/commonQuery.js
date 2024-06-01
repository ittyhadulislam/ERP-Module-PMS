import {
  get_buyer_by_company,
  get_company_by_user_id,
  get_lay_by_style_and_po,
  get_po_by_style,
  get_style_by_buyer,
  get_style_by_buyer_cutting_report,
} from "../../../apiRoutes";
import { apiSlice } from "../../api/apiSlice";

const commonQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCompanyByUser: builder.query({
      query: (id) => id && `${get_company_by_user_id}?comID=${id}`,
    }),
    getBuyerByCompany: builder.query({
      query: (id) => id && `${get_buyer_by_company}?comID=${id}`,
    }),
    getStyleByBuyer: builder.query({
      query: ({ id, buyer }) =>
        id &&
        buyer &&
        `${get_style_by_buyer_cutting_report}?comID=${id}&buyerID=${buyer}`,
    }),
    getPoByStyle: builder.query({
      query: (id) => id && `${get_po_by_style}?style=${id}`,
    }),
    getLayByStyleAndPo: builder.query({
      query: ({ style, po }) =>
        style && po && `${get_lay_by_style_and_po}?styleID=${style}&POID=${po}`,
    }),
  }),
});

export const {
  useGetCompanyByUserQuery,
  useGetBuyerByCompanyQuery,
  useGetStyleByBuyerQuery,
  useGetPoByStyleQuery,
  useGetLayByStyleAndPoQuery,
} = commonQuery;
