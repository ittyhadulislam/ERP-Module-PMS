import { save_line_details, update_line_details } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const lineDetailsMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveLineDetails: builder.mutation({
      query: (data) => ({
        url: save_line_details,
        method: "POST",
        body: data,
      }),
    }),
    updateLineDetails: builder.mutation({
      query: (data) => ({
        url: update_line_details,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useSaveLineDetailsMutation, useUpdateLineDetailsMutation } =
  lineDetailsMutation;
