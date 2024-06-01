import {
  color,
  concern_view,
  constriction,
  cost,
  csAddView,
  csNo,
  cs_report,
  currency,
  dimension,
  dmm_view,
  finishing,
  for_approval_price_view,
  get_construction_view,
  get_cs_view,
  get_dimension_view,
  get_finish_view,
  get_main_category,
  get_sub_cat_view,
  get_unit_price_comparison,
  ia_view,
  infoByStyleEdit,
  main_category,
  master_category,
  md_view,
  mm_view,
  payment,
  price,
  quality,
  scm_view,
  ship,
  style,
  style_details,
  sub_category,
  suppler,
  unit,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const getPriceComparison = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getStyleForSupplier: builder.query({
      query: () => style,
    }),
    getCurrencyForSupplier: builder.query({
      query: () => currency,
    }),
    getStyleDetails: builder.query({
      query: (id) => id && `${style_details}?styleId=${id}`,
    }),
    getMaterCategory: builder.query({
      query: () => master_category,
    }),
    getMainCategory: builder.query({
      query: (id) => id && `${main_category}?mastercateID=${id}`,
    }),
    getSubCategory: builder.query({
      query: (id) => id && `${sub_category}?maincateID=${id}`,
    }),
    getConstriction: builder.query({
      query: (id) => id && `${constriction}?maincatID=${id}`,
    }),
    getDimension: builder.query({
      query: (id) => id && `${dimension}?maincateID=${id}`,
    }),
    getFinishing: builder.query({
      query: (id) => id && `${finishing}?maincateID=${id}`,
    }),
    getUnit: builder.query({
      query: () => `${unit}`,
      // query: (id) => id && `${unit}?subcateID=${id}`,
    }),
    getColor: builder.query({
      query: (params) => params && `${color}?colorName=${params}`,
    }),
    getSuppler: builder.query({
      query: (id) => id && `${suppler}?maincateID=${id}`,
    }),
    getPayment: builder.query({
      query: () => payment,
    }),
    getPrice: builder.query({
      query: () => price,
    }),
    getShip: builder.query({
      query: () => ship,
    }),
    getCost: builder.query({
      query: () => cost,
    }),
    getQuality: builder.query({
      query: () => quality,
    }),
    getCsAddView: builder.query({
      query: (id) => id && `${csAddView}?UID=${id}`,
    }),
    getCsNo: builder.query({
      query: (userName) => userName && `${csNo}?UID=${userName}`,
    }),
    getInfoByStyleEdit: builder.query({
      query: (id) => id && `${infoByStyleEdit}?csNo=${id}`,
    }),
    getPriceViewForApproval: builder.query({
      query: (user) => user && `${for_approval_price_view}?UserName=${user}`,
    }),
    getScmView: builder.query({
      query: (user) => user && `${scm_view}?UserName=${user}`,
    }),
    getConcernView: builder.query({
      query: (user) => user && `${concern_view}?UserName=${user}`,
    }),
    getMMView: builder.query({
      query: (user) => user && `${mm_view}?UserName=${user}`,
    }),
    getDMMView: builder.query({
      query: (user) => user && `${dmm_view}?UserName=${user}`,
    }),
    getIAView: builder.query({
      query: (user) => user && `${ia_view}?UserName=${user}`,
    }),
    getMDView: builder.query({
      query: (user) => user && `${md_view}?UserName=${user}`,
    }),
    //id && `${report}&csno=${id}`
    getReport: builder.query({
      query: ({ id, user }) =>
        id &&
        user && {
          url: `${cs_report}&csno=${id}&UserName=${user}`,
          // transformResponse: (response) => {
          //   return response.blob(); // Set the responseType to 'blob'
          // },
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    getMainCategoryWithoutMaster: builder.query({
      query: () => get_main_category,
    }),
    getUnitPriceComparison: builder.query({
      query: () => get_unit_price_comparison,
    }),
    getSubCategoryView: builder.query({
      query: (id) => id && `${get_sub_cat_view}?mcatID=${id}`,
    }),
    getConstructionView: builder.query({
      query: (id) => id && `${get_construction_view}?mcatID=${id}`,
    }),
    getDimensionView: builder.query({
      query: (id) => id && `${get_dimension_view}?mcatID=${id}`,
    }),
    getFinishView: builder.query({
      query: (id) => id && `${get_finish_view}?mcatID=${id}`,
    }),
    getCsView: builder.query({
      query: (id) => id && `${get_cs_view}?CSID=${id}`,
    }),
  }),
});

export const {
  useGetStyleForSupplierQuery,
  useGetCurrencyForSupplierQuery,
  useGetStyleDetailsQuery,
  useGetMaterCategoryQuery,
  useGetMainCategoryQuery,
  useGetSubCategoryQuery,
  useGetConstrictionQuery,
  useGetDimensionQuery,
  useGetFinishingQuery,
  useGetUnitQuery,
  useGetColorQuery,
  useGetSupplerQuery,
  useGetPaymentQuery,
  useGetCostQuery,
  useGetQualityQuery,
  useGetPriceQuery,
  useGetShipQuery,
  useGetCsAddViewQuery,
  useGetCsNoQuery,
  useGetInfoByStyleEditQuery,
  useGetPriceViewForApprovalQuery,
  useGetScmViewQuery,
  useGetConcernViewQuery,
  useGetMMViewQuery,
  useGetDMMViewQuery,
  useGetIAViewQuery,
  useGetMDViewQuery,
  useGetReportQuery,
  useGetMainCategoryWithoutMasterQuery,
  useGetUnitPriceComparisonQuery,
  useGetSubCategoryViewQuery,
  useGetConstructionViewQuery,
  useGetDimensionViewQuery,
  useGetFinishViewQuery,
  useLazyGetCsViewQuery,
} = getPriceComparison;
