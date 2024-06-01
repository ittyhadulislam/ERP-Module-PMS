import {
  print_embroidery_color,
  print_embroidery_country,
  print_embroidery_floor,
  print_embroidery_line,
  print_embroidery_po,
  print_embroidery_send_receive,
  print_embroidery_stage,
  print_embroidery_style,
  print_embroidery_view,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const printAndEmbroideryQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPrintAndEmbroideryStyle: builder.query({
      query: (id) => id && `${print_embroidery_style}?comID=${id}`,
    }),
    getPrintAndEmbroideryPo: builder.query({
      query: ({ id, style }) =>
        id && style && `${print_embroidery_po}?comID=${id}&styleID=${style}`,
    }),
    getPrintAndEmbroideryCountry: builder.query({
      query: ({ id, style, po }) =>
        id &&
        style &&
        po &&
        `${print_embroidery_country}?comID=${id}&styleID=${style}&POID=${po}`,
    }),
    getPrintAndEmbroideryColor: builder.query({
      query: ({ id, style, po }) =>
        id &&
        style &&
        po &&
        `${print_embroidery_color}?comID=${id}&styleID=${style}&POID=${po}`,
    }),
    getPrintAndEmbroideryFloor: builder.query({
      query: (id) => id && `${print_embroidery_floor}?comID=${id}`,
    }),
    getPrintAndEmbroideryLine: builder.query({
      query: ({ id, floor }) =>
        id && floor && `${print_embroidery_line}?comID=${id}&floorID=${floor}`,
    }),
    getPrintAndEmbroideryStage: builder.query({
      query: () => `${print_embroidery_stage}`,
    }),
    getPrintAndEmbroiderySendReceive: builder.query({
      query: () => `${print_embroidery_send_receive}`,
    }),
    getPrintAndEmbroideryView: builder.query({
      query: ({ id, style, po, country, color, peType, sendReceive }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        peType &&
        sendReceive &&
        `${print_embroidery_view}?comID=${id}&styleID=${style}&POID=${po}&countryID=${country}&colorID=${color}&petypeID=${peType}&sndrcvtypeID=${sendReceive}`,
    }),
  }),
});

export const {
  useGetPrintAndEmbroideryStyleQuery,
  useGetPrintAndEmbroideryPoQuery,
  useGetPrintAndEmbroideryCountryQuery,
  useGetPrintAndEmbroideryColorQuery,
  useGetPrintAndEmbroideryFloorQuery,
  useGetPrintAndEmbroideryLineQuery,
  useGetPrintAndEmbroideryStageQuery,
  useGetPrintAndEmbroiderySendReceiveQuery,
  useGetPrintAndEmbroideryViewQuery,
} = printAndEmbroideryQuery;
