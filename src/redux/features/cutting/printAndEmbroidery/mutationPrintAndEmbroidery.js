import { print_embroidery_save } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const printAndEmbroideryMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    savePrintEmbroidery: builder.mutation({
      query: (data) => ({
        url: print_embroidery_save,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSavePrintEmbroideryMutation } = printAndEmbroideryMutation;
