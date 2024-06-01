import { save_smv } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const smvMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveSmv: builder.mutation({
      query: (data) => ({
        url: save_smv,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveSmvMutation } = smvMutation;
