import {
  getAcceptanceApproved,
  getAcceptanceB2b,
  getAcceptanceConApp,
  getAcceptanceForApp,
  getAcceptanceForAppEdit,
  getAcceptanceInvoiceInfo,
  getAcceptancePaymentChange,
  getAcceptanceSupplier,
  getInvoiceNo,
  getMasterLcByB2b,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";

const acceptanceQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAcceptanceSupplier: builder.query({
      query: (user) => user && `${getAcceptanceSupplier}?userName=${user}`,
    }),
    getAcceptanceB2b: builder.query({
      query: (id) => id && `${getAcceptanceB2b}?supplierID=${id}`,
    }),
    getInvoice: builder.query({
      query: (b2b) => b2b && `${getInvoiceNo}?b2bID=${b2b}`,
    }),
    getMasterLcByB2b: builder.query({
      query: (b2b) => b2b && `${getMasterLcByB2b}?b2bID=${b2b}`,
    }),
    getAcceptanceInvoiceInfo: builder.query({
      query: ({ b2b, invNo }) =>
        b2b &&
        invNo &&
        `${getAcceptanceInvoiceInfo}?B2BLC=${b2b}&invNo=${invNo}`,
    }),
    getAcceptancePaymentChange: builder.query({
      query: ({ id, date }) =>
        id &&
        date &&
        `${getAcceptancePaymentChange}?payModId=${id}&maturityDate=${date}`,
    }),
    getAcceptanceForApp: builder.query({
      query: (user) => user && `${getAcceptanceForApp}?userName=${user}`,
    }),
    getAcceptanceForAppEdit: builder.query({
      query: ({ b2b, invNo }) =>
        b2b &&
        invNo &&
        `${getAcceptanceForAppEdit}?bblcode=${b2b}&invNo=${invNo}`,
    }),
    getAcceptanceConApp: builder.query({
      query: (user) => user && `${getAcceptanceConApp}?userName=${user}`,
    }),
    getAcceptanceApproved: builder.query({
      query: (user) => user && `${getAcceptanceApproved}?userName=${user}`,
    }),
  }),
});

export const {
  useGetAcceptanceSupplierQuery,
  useLazyGetAcceptanceB2bQuery,
  useLazyGetInvoiceQuery,
  useLazyGetMasterLcByB2bQuery,
  useLazyGetAcceptanceInvoiceInfoQuery,
  useLazyGetAcceptancePaymentChangeQuery,
  useGetAcceptanceForAppQuery,
  useLazyGetAcceptanceForAppEditQuery,
  useGetAcceptanceConAppQuery,
  useGetAcceptanceApprovedQuery,
} = acceptanceQuery;
