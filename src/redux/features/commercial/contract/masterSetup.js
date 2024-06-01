import {
  addOrEditBank,
  addOrEditPaymentMode,
  addOrEditPaymentTerm,
  getAllBankInfo,
  getAllCurrency,
  getAllPaymentMode,
  getAllPaymentTerm,
  saveCurrency,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";

const masterSetupApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllBankList: builder.query({
      query: () => getAllBankInfo,
    }),
    saveAndEdit: builder.mutation({
      query: (data) => ({
        url: addOrEditBank,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // pessimistic update
          const saveData = await queryFulfilled;
          // dispatch for get all bank list
          dispatch(
            apiSlice.util.updateQueryData("getComBank", undefined, (draft) => {
              const obj = { bank_ID: arg.bank_Code, bank_Name: arg.bank_Name };
              draft.data = draft.data.filter(
                (e) => e.bank_ID !== arg.bank_Code
              );
              draft.data = draft.data.filter((e) => e.bank_ID !== 0);

              draft.data.push(obj);
            })
          );
          // dispatch for get all table list
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllBankList",
              undefined,
              (draft) => {
                return (draft = saveData.data);
              }
            )
          );
        } catch (err) {}
      },
    }),
    getAllCurrencyList: builder.query({
      query: () => getAllCurrency,
    }),
    saveCurrencyData: builder.mutation({
      query: (data) => ({
        url: saveCurrency,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // pessimistic update
          const saveData = await queryFulfilled;
          // dispatch for get all bank list
          dispatch(
            apiSlice.util.updateQueryData(
              "getComCurrency",
              undefined,
              (draft) => {
                draft.data.push({ currency_Name: arg.cCurdes });
              }
            )
          );
          // dispatch for get all table list
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllCurrencyList",
              undefined,
              (draft) => {
                return (draft = saveData.data);
              }
            )
          );
        } catch (err) {}
      },
    }),

    getAllPaymentTerm: builder.query({
      query: () => getAllPaymentTerm,
    }),
    saveAndEditPaymentTerm: builder.mutation({
      query: (data) => ({
        url: addOrEditPaymentTerm,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // pessimistic update
          const saveData = await queryFulfilled;

          // dispatch for get all bank list
          dispatch(
            apiSlice.util.updateQueryData(
              "getComPaymentTerm",
              undefined,
              (draft) => {
                const obj = {
                  payment_ID: arg.paymentTermID,
                  payment_Name: arg.paymentTerm,
                };
                draft.data = draft.data.filter(
                  (e) => e.payment_ID !== arg.paymentTermID
                );
                draft.data = draft.data.filter((e) => e.payment_ID !== 0);

                draft.data.push(obj);
              }
            )
          );
          // dispatch for get all table list
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllPaymentTerm",
              undefined,
              (draft) => {
                return (draft = saveData.data);
              }
            )
          );
        } catch (err) {}
      },
    }),
    getAllPaymentMode: builder.query({
      query: () => getAllPaymentMode,
    }),
    saveAndEditPaymentMode: builder.mutation({
      query: (data) => ({
        url: addOrEditPaymentMode,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // pessimistic update
          const saveData = await queryFulfilled;

          // dispatch for get all bank list
          dispatch(
            apiSlice.util.updateQueryData(
              "getComPaymentMode",
              undefined,
              (draft) => {
                const obj = {
                  paymentMode_ID: arg.paymentModeID,
                  paymentMode_Name: arg.paymentMode,
                };
                draft.data = draft.data.filter(
                  (e) => e.paymentMode_ID !== arg.paymentModeID
                );
                draft.data = draft.data.filter((e) => e.paymentMode_ID !== 0);

                draft.data.push(obj);
              }
            )
          );
          // dispatch for get all table list
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllPaymentMode",
              undefined,
              (draft) => {
                return (draft = saveData.data);
              }
            )
          );
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetAllBankListQuery,
  useSaveAndEditMutation,
  useGetAllCurrencyListQuery,
  useSaveCurrencyDataMutation,
  useGetAllPaymentTermQuery,
  useSaveAndEditPaymentTermMutation,
  useGetAllPaymentModeQuery,
  useSaveAndEditPaymentModeMutation,
} = masterSetupApi;
