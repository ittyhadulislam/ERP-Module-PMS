import {
  get_finish_color,
  get_finish_country,
  get_finish_floor,
  get_finish_hourly_production,
  get_finish_line,
  get_finish_po,
  get_finish_size,
  get_finish_style,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const finishingQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFinishingStyle: builder.query({
      query: (id) => id && `${get_finish_style}?comID=${id}`,
    }),
    getFinishingPo: builder.query({
      query: (style) => style && `${get_finish_po}?styleID=${style}`,
    }),
    getFinishingCountry: builder.query({
      query: ({ id, style, po }) =>
        id &&
        style &&
        po &&
        `${get_finish_country}?comID=${id}&styleID=${style}&poID=${po}`,
    }),
    getFinishingColor: builder.query({
      query: ({ id, style, po, country }) =>
        id &&
        style &&
        po &&
        country &&
        `${get_finish_color}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}`,
    }),
    getFinishingFloor: builder.query({
      query: ({ id, style, po, country, color }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        `${get_finish_floor}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}`,
    }),
    getFinishingLine: builder.query({
      //?comID=49&styleID=1&poID=1&colorID=1&countryID=1&FloorID=1
      query: ({ id, style, po, country, color, floor }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        floor &&
        `${get_finish_line}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}&FloorID=${floor}`,
    }),
    getFinishingSize: builder.query({
      query: ({ id, style, po, country, color }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        `${get_finish_size}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}`,
    }),
    getFinishingHourlyProduction: builder.query({
      //?comID=49&styleID=1&poID=1&colorID=1&countryID=1&lineID=1&size=1
      query: ({ id, style, po, country, color, line, size }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        line &&
        size &&
        `${get_finish_hourly_production}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}&colorID=${color}&lineID=${line}&size=${size}`,
    }),
  }),
});

export const {
  useGetFinishingStyleQuery,
  useGetFinishingPoQuery,
  useGetFinishingCountryQuery,
  useGetFinishingColorQuery,
  useGetFinishingFloorQuery,
  useGetFinishingLineQuery,
  useGetFinishingSizeQuery,
  useGetFinishingHourlyProductionQuery,
} = finishingQuery;
