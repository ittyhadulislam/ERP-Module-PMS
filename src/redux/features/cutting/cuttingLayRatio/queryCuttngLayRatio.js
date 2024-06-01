import {
  cut_lay_details,
  cut_lay_report,
  cut_size_ratio,
  lay_auto_lay,
  lay_country,
  lay_cut_no,
  lay_po,
  lay_style,
  lay_year,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const cuttingLayRatioQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLayRatioYear: builder.query({
      query: (id) => id && `${lay_year}?comID=${id}`,
    }),
    getLayRatioStyle: builder.query({
      query: ({ year, comId }) =>
        year && comId && `${lay_style}?Year=${year}&comID=${comId}`,
    }),
    getLayRatioPo: builder.query({
      query: (style) => style && `${lay_po}?styleID=${style}`,
    }),
    getLayRatioCountry: builder.query({
      query: ({ style, poId }) =>
        style && poId && `${lay_country}?styleID=${style}&POID=${poId}`,
    }),
    getLayRatioCutNo: builder.query({
      query: ({ style, poId }) =>
        style && poId && `${lay_cut_no}?styleID=${style}&POID=${poId}`,
    }),
    getLayRatioAutoLay: builder.query({
      query: ({ style, poId }) =>
        style && poId && `${lay_auto_lay}?styleID=${style}&POID=${poId}`,
    }),
    getLaySizeRatio: builder.query({
      query: ({ style, poId }) =>
        style && poId && `${cut_size_ratio}?styleID=${style}&POID=${poId}`,
    }),
    getLayDetails: builder.query({
      query: ({ style, poId }) =>
        style && poId && `${cut_lay_details}?styleID=${style}&POID=${poId}`,
    }),

    getLayRatioReport: builder.query({
      query: ({ id, style, po, country, user }) =>
        id &&
        style &&
        po &&
        country &&
        user && {
          url: `${cut_lay_report}&comID=${id}&style=${style}&po=${po}&country=${country}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
  }),
});

export const {
  useGetLayRatioYearQuery,
  useGetLayRatioStyleQuery,
  useGetLayRatioPoQuery,
  useGetLayRatioCountryQuery,
  useGetLayRatioCutNoQuery,
  useGetLayRatioAutoLayQuery,
  useGetLaySizeRatioQuery,
  useGetLayDetailsQuery,
  useGetLayRatioReportQuery,
  useLazyGetLayRatioReportQuery,
} = cuttingLayRatioQuery;
