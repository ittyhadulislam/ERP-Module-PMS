import {
  get_weaving_master_setup_buyer,
  get_weaving_master_setup_color,
  get_weaving_master_setup_composition,
  get_weaving_master_setup_construction,
  get_weaving_master_setup_design,
  get_weaving_master_setup_dia,
  get_weaving_master_setup_gsm,
  get_weaving_yarn_count,
  get_weaving_yarn_type,
  weaving_master_setup_customer,
} from "../../../../apiRoutes/weaving";
import { apiSlice } from "../../../api/apiSlice";

const masterSetupQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getWeavingMasterYarnType: builder.query({
      query: () => get_weaving_yarn_type,
    }),
    getWeavingMasterYarnCount: builder.query({
      query: () => get_weaving_yarn_count,
    }),
    getWeavingMasterDia: builder.query({
      query: () => get_weaving_master_setup_dia,
    }),
    getWeavingMasterComposition: builder.query({
      query: () => get_weaving_master_setup_composition,
    }),
    getWeavingMasterConstruction: builder.query({
      query: () => get_weaving_master_setup_construction,
    }),
    getWeavingMasterDesign: builder.query({
      query: () => get_weaving_master_setup_design,
    }),
    getWeavingMasterGsm: builder.query({
      query: () => get_weaving_master_setup_gsm,
    }),
    getWeavingMasterBuyer: builder.query({
      query: () => get_weaving_master_setup_buyer,
    }),
    getWeavingMasterColor: builder.query({
      query: () => get_weaving_master_setup_color,
    }),
    getWeavingMasterCustomer: builder.query({
      query: () => weaving_master_setup_customer,
    }),
  }),
});

export const {
  useGetWeavingMasterYarnTypeQuery,
  useGetWeavingMasterYarnCountQuery,
  useGetWeavingMasterDiaQuery,
  useGetWeavingMasterCompositionQuery,
  useGetWeavingMasterConstructionQuery,
  useGetWeavingMasterDesignQuery,
  useGetWeavingMasterGsmQuery,
  useGetWeavingMasterBuyerQuery,
  useGetWeavingMasterColorQuery,
  useGetWeavingMasterCustomerQuery,
} = masterSetupQuery;
