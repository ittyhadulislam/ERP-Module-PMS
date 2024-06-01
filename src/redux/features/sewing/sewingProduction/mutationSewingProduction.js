import {
  active_sewing_production,
  inActive_sewing_production,
  save_sewing_production,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const sewingProductionMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveSewingProduction: builder.mutation({
      query: (data) => ({
        url: save_sewing_production,
        method: "POST",
        body: data,
      }),
    }),
    activeSewingProduction: builder.mutation({
      query: (data) => ({
        url: active_sewing_production,
        method: "POST",
        body: data,
      }),
    }),
    inActiveSewingProduction: builder.mutation({
      query: (data) => ({
        url: inActive_sewing_production,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveSewingProductionMutation,
  useActiveSewingProductionMutation,
  useInActiveSewingProductionMutation,
} = sewingProductionMutation;
