import { save_costing_data } from "../../../../apiRoutes/weaving";
import { apiSlice } from "../../../api/apiSlice";

const costingMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveCosting: builder.mutation({
      query: (data) => ({
        url: save_costing_data,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveCostingMutation } = costingMutation;
