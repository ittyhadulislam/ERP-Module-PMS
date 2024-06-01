import {
  get_order_info,
  get_order_info_by_name,
  get_yarn_count,
  get_yarn_type,
} from "../../../../apiRoutes/weaving";
import { apiSlice } from "../../../api/apiSlice";

const costingQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCostingOrderInfo: builder.query({
      query: () => get_order_info,
    }),
    getCostingOrderInfoByName: builder.query({
      query: (name) => name && `${get_order_info_by_name}?OrdNo=${name}`,
    }),
    getCostingYarnType: builder.query({
      query: () => get_yarn_type,
    }),
    getCostingYarnCount: builder.query({
      query: () => get_yarn_count,
    }),
  }),
});

export const {
  useGetCostingOrderInfoQuery,
  useGetCostingOrderInfoByNameQuery,
  useGetCostingYarnTypeQuery,
  useGetCostingYarnCountQuery,
} = costingQuery;
