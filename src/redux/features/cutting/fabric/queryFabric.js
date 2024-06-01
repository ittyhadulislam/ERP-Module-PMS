import {
  get_cut_qty,
  get_fabric,
  get_fabric_buyer,
  get_fabric_color,
  get_fabric_style,
  get_order_qty,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const fabricQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFabricBuyer: builder.query({
      query: (id) => id && `${get_fabric_buyer}?comID=${id}`,
    }),
    getFabricStyle: builder.query({
      query: ({ id, buyer }) =>
        id && buyer && `${get_fabric_style}?comID=${id}&buyer=${buyer}`,
    }),

    getFabricColor: builder.query({
      query: ({ id, style }) =>
        id && style && `${get_fabric_color}?comID=${id}&style=${style}`,
    }),
    getFabric: builder.query({
      query: () => `${get_fabric}`,
    }),
    getOrderQty: builder.query({
      query: ({ style, color }) =>
        color && style && `${get_order_qty}?style=${style}&color=${color}`,
    }),
    getCutQty: builder.query({
      query: ({ style, color }) =>
        color && style && `${get_cut_qty}?style=${style}&color=${color}`,
    }),
  }),
});

export const {
  useGetFabricBuyerQuery,
  useGetFabricStyleQuery,
  useGetFabricColorQuery,
  useGetFabricQuery,
  useGetCutQtyQuery,
  useGetOrderQtyQuery,
} = fabricQuery;
