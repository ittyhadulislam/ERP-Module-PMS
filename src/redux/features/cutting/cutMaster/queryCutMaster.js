import {
  company,
  cut_buyer,
  cut_garments,
  cut_style,
  cut_view,
  cut_year,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const cutMasterQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCompanyInfo: builder.query({
      query: () => company,
    }),
    getYear: builder.query({
      query: () => cut_year,
    }),
    getBuyer: builder.query({
      query: ({ comID, year }) =>
        comID && year && `${cut_buyer}?comID=${comID}&year=${year}`,
    }),
    getStyle: builder.query({
      query: ({ comID, buyer }) =>
        comID && buyer && `${cut_style}?comID=${comID}&buyerID=${buyer}`,
    }),
    getGarments: builder.query({
      query: ({ buyer, style }) =>
        buyer && style && `${cut_garments}?buyerID=${buyer}&styleID=${style}`,
    }),
    getView: builder.query({
      query: (style) => style && `${cut_view}?styleID=${style}`,
    }),
  }),
});

export const {
  useGetCompanyInfoQuery,
  useGetYearQuery,
  useLazyGetBuyerQuery,
  useLazyGetStyleQuery,
  useLazyGetGarmentsQuery,
  useLazyGetViewQuery,
} = cutMasterQuery;
