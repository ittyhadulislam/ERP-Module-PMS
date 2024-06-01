import {
  complete_gate_pass_data,
  delete_gate_pass_data,
  save_gate_pass_data,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const generalGatePassMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveGeneralGatePass: builder.mutation({
      query: (data) => ({
        url: save_gate_pass_data,
        method: "POST",
        body: data,
      }),
    }),
    deleteGeneralGatePass: builder.mutation({
      query: (id) => ({
        url: `${delete_gate_pass_data}?refID=${id}`,
        method: "DELETE",
      }),
    }),
    completeGeneralGatePass: builder.mutation({
      query: (data) => ({
        url: `${complete_gate_pass_data}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveGeneralGatePassMutation,
  useDeleteGeneralGatePassMutation,
  useCompleteGeneralGatePassMutation,
} = generalGatePassMutation;
