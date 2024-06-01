import { save_packing_production } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const packingMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    savePackingProduction: builder.mutation({
      query: (data) => ({
        url: save_packing_production,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSavePackingProductionMutation } = packingMutation;
