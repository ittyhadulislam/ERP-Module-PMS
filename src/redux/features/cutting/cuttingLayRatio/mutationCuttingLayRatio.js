import { lay_save_cutting, lay_save_ratio } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const cuttingLayRatioMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveLayCutting: builder.mutation({
      query: (data) => ({
        url: lay_save_cutting,
        method: "POST",
        body: data,
      }),
    }),
    saveLayRatio: builder.mutation({
      query: (data) => ({
        url: lay_save_ratio,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveLayCuttingMutation, useSaveLayRatioMutation } =
  cuttingLayRatioMutation;
