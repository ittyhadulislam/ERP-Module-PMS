import { cut_select } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const cutMasterMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    select: builder.mutation({
      query: (data) => ({
        url: cut_select,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSelectMutation } = cutMasterMutation;
