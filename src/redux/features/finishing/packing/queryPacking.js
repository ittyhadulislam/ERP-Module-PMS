import {
  get_packing_color,
  get_packing_country,
  get_packing_daily_report,
  get_packing_floor,
  get_packing_hourly_production,
  get_packing_line,
  get_packing_po,
  get_packing_report_country,
  get_packing_report_country_wise,
  get_packing_size,
  get_packing_style,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const packingQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPackingStyle: builder.query({
      query: (id) => id && `${get_packing_style}?comID=${id}`,
    }),
    getPackingPo: builder.query({
      query: (style) => style && `${get_packing_po}?styleID=${style}`,
    }),
    getPackingCountry: builder.query({
      query: ({ id, style, po }) =>
        id &&
        style &&
        po &&
        `${get_packing_country}?comID=${id}&styleID=${style}&poID=${po}`,
    }),
    getPackingColor: builder.query({
      query: ({ id, style, po, country }) =>
        id &&
        style &&
        po &&
        country &&
        `${get_packing_color}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}`,
    }),
    getPackingFloor: builder.query({
      query: ({ id, style, po, country, color }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        `${get_packing_floor}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}`,
    }),
    getPackingLine: builder.query({
      //?comID=49&styleID=1&poID=1&colorID=1&countryID=1&FloorID=1
      query: ({ id, style, po, country, color, floor }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        floor &&
        `${get_packing_line}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}&FloorID=${floor}`,
    }),
    getPackingSize: builder.query({
      query: ({ id, style, po, country, color }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        `${get_packing_size}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}`,
    }),
    getPackingHourlyProduction: builder.query({
      query: ({ id, style, po, country, color, line, size }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        line &&
        size &&
        `${get_packing_hourly_production}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}&lineID=${line}&size=${size}`,
    }),
    getPackingReportCountry: builder.query({
      query: ({ style, po }) =>
        style &&
        po &&
        `${get_packing_report_country}?styleID=${style}&poID=${po}`,
    }),
    getDailyPackingReport: builder.query({
      query: ({ id, date, user }) =>
        id &&
        date &&
        user && {
          url: `${get_packing_daily_report}&comID=${id}&date=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getPackingReportCountryWise: builder.query({
      query: ({ id, style, styleId, po, poId, user }) =>
        id &&
        style &&
        styleId &&
        po &&
        poId &&
        user && {
          url: `${get_packing_report_country_wise}&comID=${id}&styleId=${styleId}&style=${style}&poID=${poId}&PONo=${po}&UserName=${user}`,
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
  useGetPackingStyleQuery,
  useGetPackingPoQuery,
  useGetPackingCountryQuery,
  useGetPackingColorQuery,
  useGetPackingFloorQuery,
  useGetPackingLineQuery,
  useGetPackingSizeQuery,
  useGetPackingHourlyProductionQuery,
  useLazyGetDailyPackingReportQuery,
  useLazyGetPackingReportCountryWiseQuery,
  useGetPackingReportCountryQuery,
} = packingQuery;
