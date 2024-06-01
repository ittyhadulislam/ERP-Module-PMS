import {
  complete_order_receiving,
  delete_order_receiving,
  save_order_receiving,
} from "../../../../apiRoutes/weaving";
import { apiSlice } from "../../../api/apiSlice";

const orderReceiveMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveOrderReceive: builder.mutation({
      query: (data) => ({
        url: save_order_receiving,
        method: "POST",
        body: data,
      }),
    }),
    deleteOrderReceive: builder.mutation({
      query: (id) => ({
        url: delete_order_receiving,
        method: "DELETE",
        params: `ordref=${id}`,
      }),
    }),
    completeOrderReceive: builder.mutation({
      query: (data) => ({
        url: complete_order_receiving,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveOrderReceiveMutation,
  useDeleteOrderReceiveMutation,
  useCompleteOrderReceiveMutation,
} = orderReceiveMutation;
