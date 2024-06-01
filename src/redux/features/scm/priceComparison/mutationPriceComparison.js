import {
  Ia_approval,
  complete_post_cost_comparison,
  concern_approval,
  create_post_cost_comparison,
  delete_post_cost_comparison,
  dmm_approval,
  md_approval,
  mm_approval,
  rework_price,
  save_construction,
  save_dimension,
  save_finish,
  save_sub_category,
  scm_approval,
  update_post_cost_comparison,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const createPriceComparison = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createPostPriceComparison: builder.mutation({
      query: (data) => ({
        url: create_post_cost_comparison,
        method: "POST",
        body: data,
      }),
    }),
    deletePostPriceComparison: builder.mutation({
      query: (id) => ({
        url: id && `${delete_post_cost_comparison}?pcID=${id}`,
        method: "DELETE",
      }),
    }),
    updatePostPriceComparison: builder.mutation({
      query: (data) => ({
        url: `${update_post_cost_comparison}`,
        method: "PUT",
        body: data,
      }),
    }),
    completePriceComparison: builder.mutation({
      query: (data) => ({
        url: `${complete_post_cost_comparison}`,
        method: "PUT",
        body: data,
      }),
    }),
    scmApproval: builder.mutation({
      query: (data) => ({
        url: `${scm_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    reworkPrice: builder.mutation({
      query: (data) => ({
        url: `${rework_price}`,
        method: "PUT",
        body: data,
      }),
    }),
    concernApproval: builder.mutation({
      query: (data) => ({
        url: `${concern_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    mmApproval: builder.mutation({
      query: (data) => ({
        url: `${mm_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    dmmApproval: builder.mutation({
      query: (data) => ({
        url: `${dmm_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    iaApproval: builder.mutation({
      query: (data) => ({
        url: `${Ia_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    mdApproval: builder.mutation({
      query: (data) => ({
        url: `${md_approval}`,
        method: "PUT",
        body: data,
      }),
    }),
    saveSubCategory: builder.mutation({
      query: (data) => ({
        url: `${save_sub_category}`,
        method: "POST",
        body: data,
      }),
    }),
    saveConstruction: builder.mutation({
      query: (data) => ({
        url: `${save_construction}`,
        method: "POST",
        body: data,
      }),
    }),
    saveDimension: builder.mutation({
      query: (data) => ({
        url: `${save_dimension}`,
        method: "POST",
        body: data,
      }),
    }),
    saveFinish: builder.mutation({
      query: (data) => ({
        url: `${save_finish}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePostPriceComparisonMutation,
  useDeletePostPriceComparisonMutation,
  useUpdatePostPriceComparisonMutation,
  useCompletePriceComparisonMutation,
  useScmApprovalMutation,
  useReworkPriceMutation,
  useConcernApprovalMutation,
  useMmApprovalMutation,
  useDmmApprovalMutation,
  useIaApprovalMutation,
  useMdApprovalMutation,
  useSaveSubCategoryMutation,
  useSaveConstructionMutation,
  useSaveDimensionMutation,
  useSaveFinishMutation,
} = createPriceComparison;
