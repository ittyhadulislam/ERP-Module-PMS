import { save_fabric } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const fabricMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveFabric: builder.mutation({
      query: (data) => ({
        url: save_fabric,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveFabricMutation } = fabricMutation;
