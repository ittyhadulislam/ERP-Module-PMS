import {
  bank,
  buyer,
  company,
  currency,
  getAmendmentData,
  getAvailableStyle,
  getContractCancelledView,
  getContractDetails,
  getContractDetailsAmendmentView,
  getEditAndViewData,
  getOtherData,
  notifyParty,
  partialShipment,
  paymentMode,
  paymentTerm,
  shipmentMode,
  status,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";

const contractQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getComCompany: builder.query({
      query: (name) => name && `${company}?userName=${name}`,
    }),
    getComBuyer: builder.query({
      query: (id) => id && `${buyer}?companyID=${id}`,
    }),
    getComBank: builder.query({
      query: () => `${bank}`,
    }),
    getComNotify: builder.query({
      query: () => `${notifyParty}`,
    }),
    getComPaymentMode: builder.query({
      query: () => `${paymentMode}`,
    }),
    getComCurrency: builder.query({
      query: () => `${currency}`,
    }),
    getComPartialShipment: builder.query({
      query: () => `${partialShipment}`,
    }),
    getComPaymentTerm: builder.query({
      query: () => `${paymentTerm}`,
    }),
    getComShipMode: builder.query({
      query: () => `${shipmentMode}`,
    }),
    getComStatus: builder.query({
      query: () => `${status}`,
    }),
    getComContractDetails: builder.query({
      query: ({ contract, company }) =>
        contract &&
        company &&
        `${getContractDetails}?contractNo=${encodeURIComponent(
          contract
        )}&compid=${company}`,
    }),
    getComAvailableStyle: builder.query({
      query: ({ contract, buyerID, compid }) =>
        contract &&
        buyerID &&
        compid &&
        `${getAvailableStyle}?contractNo=${encodeURIComponent(
          contract
        )}&buyerID=${buyerID}&compid=${compid}`,
    }),
    getComEditAndView: builder.query({
      query: (id) => id && `${getEditAndViewData}?companyID=${id}`,
    }),
    getComAmendmentView: builder.query({
      query: (id) => id && `${getAmendmentData}?contarctNo=${id}`,
    }),
    getComOtherData: builder.query({
      query: (id) => id && `${getOtherData}?companyID=${id}`,
    }),
    getComContractDetailsAmendment: builder.query({
      query: ({ contract, amandmentNO }) =>
        contract &&
        `${getContractDetailsAmendmentView}?contractNo=${encodeURIComponent(
          contract
        )}&amandmentNO=${amandmentNO}`,
    }),
    getComCancelledView: builder.query({
      query: (id) => id && `${getContractCancelledView}?companyID=${id}`,
    }),
  }),
});

export const {
  useGetComCompanyQuery,
  useLazyGetComBuyerQuery,
  useGetComBankQuery,
  useGetComNotifyQuery,
  useGetComPaymentModeQuery,
  useGetComCurrencyQuery,
  useGetComPartialShipmentQuery,
  useGetComPaymentTermQuery,
  useGetComShipModeQuery,
  useGetComStatusQuery,
  useLazyGetComContractDetailsQuery,
  useLazyGetComAvailableStyleQuery,
  useGetComEditAndViewQuery,
  useGetComAmendmentViewQuery,
  useGetComOtherDataQuery,
  useLazyGetComContractDetailsAmendmentQuery,
  useGetComCancelledViewQuery,
} = contractQuery;
