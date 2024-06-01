import {
  get_order_receiving_view,
  get_order_type,
  get_weaving_buyer,
  get_weaving_color,
  get_weaving_composition,
  get_weaving_construction,
  get_weaving_customer,
  get_weaving_design,
  get_weaving_dia,
  get_weaving_fabric_type,
  get_weaving_gsm,
  get_weaving_unit,
} from "../../../../apiRoutes/weaving";
import { apiSlice } from "../../../api/apiSlice";

const orderReceiveQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOrderType: builder.query({
      query: () => get_order_type,
    }),
    getWeavingCustomer: builder.query({
      query: () => get_weaving_customer,
    }),
    getWeavingBuyer: builder.query({
      query: () => get_weaving_buyer,
    }),
    getWeavingColor: builder.query({
      query: () => get_weaving_color,
    }),
    getWeavingFabricType: builder.query({
      query: () => get_weaving_fabric_type,
    }),
    getWeavingComposition: builder.query({
      query: () => get_weaving_composition,
    }),
    getWeavingConstruction: builder.query({
      query: () => get_weaving_construction,
    }),
    getWeavingDia: builder.query({
      query: () => get_weaving_dia,
    }),
    getWeavingGsm: builder.query({
      query: () => get_weaving_gsm,
    }),
    getWeavingDesign: builder.query({
      query: () => get_weaving_design,
    }),
    getWeavingUnit: builder.query({
      query: () => get_weaving_unit,
    }),
    getWeavingOrderReceivingData: builder.query({
      query: () => get_order_receiving_view,
    }),
  }),
});

export const {
  useGetOrderTypeQuery,
  useGetWeavingCustomerQuery,
  useGetWeavingBuyerQuery,
  useGetWeavingColorQuery,
  useGetWeavingFabricTypeQuery,
  useGetWeavingCompositionQuery,
  useGetWeavingConstructionQuery,
  useGetWeavingDiaQuery,
  useGetWeavingGsmQuery,
  useGetWeavingDesignQuery,
  useGetWeavingUnitQuery,
  useGetWeavingOrderReceivingDataQuery,
} = orderReceiveQuery;
