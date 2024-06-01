import {
  get_sewing_color,
  get_sewing_country,
  get_sewing_hourly_prod,
  get_sewing_line,
  get_sewing_po,
  get_sewing_report_daily_line_stage,
  get_sewing_ship_out,
  get_sewing_size,
  get_sewing_style,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const sewingProductionQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSewingStyle: builder.query({
      query: (id) => id && `${get_sewing_style}?comID=${id}`,
    }),
    getSewingPo: builder.query({
      query: (id) => id && `${get_sewing_po}?styleID=${id}`,
    }),
    getSewingCountry: builder.query({
      query: ({ style, po }) =>
        style && po && `${get_sewing_country}?styleID=${style}&poID=${po}`,
    }),
    getSewingColor: builder.query({
      query: ({ style, po, country }) =>
        style &&
        po &&
        country &&
        `${get_sewing_color}?styleID=${style}&poID=${po}&countryID=${country}`,
    }),
    getSewingLine: builder.query({
      query: ({ style, po, country, color }) =>
        style &&
        po &&
        country &&
        color &&
        `${get_sewing_line}?styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}`,
    }),
    getSewingSize: builder.query({
      query: ({ style, po, country, color, line }) =>
        style &&
        po &&
        country &&
        color &&
        line &&
        `${get_sewing_size}?styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}&lineID=${line}`,
    }),
    getSewingHourlyProd: builder.query({
      query: ({ id, style, po, country, color, line, size, hour, date }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        line &&
        size &&
        hour &&
        date &&
        `${get_sewing_hourly_prod}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}&lineID=${line}&size=${size}&hour=${hour}&date=${date}`,
    }),
    getSewingShipOut: builder.query({
      query: (id) => id && `${get_sewing_ship_out}?buyerID=${id}`,
    }),

    getSewingReportDailyLineStageWise: builder.query({
      query: ({ id, styleId, style, lineId, line, date, user }) =>
        id &&
        styleId &&
        style &&
        lineId &&
        line &&
        date &&
        user && {
          url: `${get_sewing_report_daily_line_stage}&comID=${id}&styleID=${styleId}&style=${style}&LineID=${lineId}&Line=${line}&Date=${date}&userName=${user}`,
          // transformResponse: (response) => {
          //   return response.blob(); // Set the responseType to 'blob'
          // },
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
  useGetSewingStyleQuery,
  useGetSewingPoQuery,
  useGetSewingCountryQuery,
  useGetSewingColorQuery,
  useGetSewingLineQuery,
  useGetSewingSizeQuery,
  useGetSewingHourlyProdQuery,
  useGetSewingShipOutQuery,
  useGetSewingReportDailyLineStageWiseQuery,
} = sewingProductionQuery;
