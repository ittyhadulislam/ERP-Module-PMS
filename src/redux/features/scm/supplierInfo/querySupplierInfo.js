import {
  BSCI_audit_rating,
  WRAP_audit_rating,
  business_type,
  country,
  get_supplier_approved,
  get_supplier_for_approval,
  get_unit,
  supplier_category,
  supplier_info,
  supplier_info_by_sup,
  supplier_info_status,
  supplier_report,
  supplier_type,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const getSupplierInfo = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSupplier: builder.query({
      query: (userName) => userName && `${supplier_info}?UID=${userName}`,
    }),
    getSupplierInfoBySup: builder.query({
      query: (userId) => userId && `${supplier_info_by_sup}?supID=${userId}`,
    }),
    getSupplierCategory: builder.query({
      query: () => supplier_category,
    }),
    getSupplierType: builder.query({
      query: () => supplier_type,
    }),
    getBusinessType: builder.query({
      query: () => business_type,
    }),
    getCountry: builder.query({
      query: () => country,
    }),
    getSupplierInfoStatus: builder.query({
      query: () => supplier_info_status,
    }),
    getBSCIAuditRating: builder.query({
      query: () => BSCI_audit_rating,
    }),
    getWRAPAuditRating: builder.query({
      query: () => WRAP_audit_rating,
    }),
    getUnitTest: builder.query({
      query: () => get_unit,
    }),
    getSupplierForApproval: builder.query({
      query: () => get_supplier_for_approval,
    }),
    getSupplierApproved: builder.query({
      query: () => get_supplier_approved,
    }),
    getSupplierReport: builder.query({
      query: (id) =>
        id && {
          url: `${supplier_report}&supID=${id}`,
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
  }),
});

export const {
  useGetSupplierQuery,
  useGetSupplierInfoBySupQuery,
  useGetSupplierCategoryQuery,
  useGetSupplierTypeQuery,
  useGetBusinessTypeQuery,
  useGetCountryQuery,
  useGetSupplierInfoStatusQuery,
  useGetBSCIAuditRatingQuery,
  useGetWRAPAuditRatingQuery,
  useGetUnitTestQuery,
  useGetSupplierForApprovalQuery,
  useGetSupplierApprovedQuery,
  useGetSupplierReportQuery,
} = getSupplierInfo;
