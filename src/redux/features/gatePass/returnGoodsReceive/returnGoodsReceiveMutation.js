import {
  complete_gate_pass_return_receive,
  delete_gate_pass_return_receive,
  save_gate_pass_return_receive,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const returnGoodsReceiveMutation = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    saveReturnReceive: builder.mutation({
      query: (data) => ({
        url: save_gate_pass_return_receive,
        method: "POST",
        body: data,
      }),
    }),
    completeReturnReceive: builder.mutation({
      query: (data) => ({
        url: `${complete_gate_pass_return_receive}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteReturnReceive: builder.mutation({
      query: ({ id, GPNo }) => ({
        url: `${delete_gate_pass_return_receive}?RtnID=${id}&GPNo=${GPNo}`,
        method: "DELETE",
        // body: data,
      }),
    }),
  }),
});

export const {
  useSaveReturnReceiveMutation,
  useCompleteReturnReceiveMutation,
  useDeleteReturnReceiveMutation,
} = returnGoodsReceiveMutation;
