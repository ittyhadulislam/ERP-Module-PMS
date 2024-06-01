import { save_finishing_production } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const finishingMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveFinishingProduction: builder.mutation({
      query: (data) => ({
        url: save_finishing_production,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveFinishingProductionMutation } = finishingMutation;
