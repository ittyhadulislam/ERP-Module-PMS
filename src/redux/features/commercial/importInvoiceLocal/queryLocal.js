import {
  getDeleteImportLocal,
  getImportLocal,
  getLocalB2b,
  getLocalPiList,
  getLocalPiSelected,
  getLocalSupplier,
  getUnitUrl,
  importLocalNext,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";
import { setLocalInvoice } from "./localSlice";

const localQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLocalSupplier: builder.query({
      query: (user) => user && `${getLocalSupplier}?userName=${user}`,
    }),
    getLocalB2b: builder.query({
      query: (id) => id && `${getLocalB2b}?supId=${id}`,
    }),
    getLocalPiList: builder.query({
      query: (id) => id && `${getLocalPiList}?b2bId=${id}`,
    }),
    getLocalPiSelectedList: builder.query({
      query: (id) =>
        id && `${getLocalPiSelected}?piNo=${encodeURIComponent(id)}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = (await queryFulfilled).data?.data?.map((e, i) => ({
            ...e,
            id: i + 1,
          }));
          dispatch(setLocalInvoice({ key: "grnList", value: result }));
          dispatch(setLocalInvoice({ key: "grnLoading", value: true }));
        } catch (err) {
          dispatch(setLocalInvoice({ key: "grnLoading", value: false }));
        } finally {
          dispatch(setLocalInvoice({ key: "grnLoading", value: false }));
        }
      },
    }),
    getLocalPiDelete: builder.query({
      query: ({ Qty, InvNo, Itcode }) =>
        Qty &&
        InvNo &&
        Itcode &&
        `${getDeleteImportLocal}?Qty=${Qty}&InvNo=${InvNo}&Itcode=${Itcode}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { grnList, addGrnList } = (await queryFulfilled)?.data;
          dispatch(
            setLocalInvoice({
              key: "grnList",
              value: grnList?.map((e, i) => ({
                ...e,
                id: i + 1,
              })),
            })
          );
          dispatch(setLocalInvoice({ key: "grnLoading", value: true }));
          dispatch(
            setLocalInvoice({
              key: "addGrnList",
              value: addGrnList?.map((e, i) => ({
                ...e,
                id: i + 1,
              })),
            })
          );
          dispatch(setLocalInvoice({ key: "addGrnLoading", value: true }));
        } catch (err) {
          dispatch(setLocalInvoice({ key: "grnLoading", value: false }));
          dispatch(setLocalInvoice({ key: "addGrnLoading", value: false }));
          dispatch(setLocalInvoice({ key: "addGrnList", value: [] }));
        } finally {
          dispatch(setLocalInvoice({ key: "grnLoading", value: false }));
          dispatch(setLocalInvoice({ key: "addGrnLoading", value: false }));
        }
      },
    }),
    nextImportLocal: builder.query({
      query: ({ b2bLc, invNo }) =>
        b2bLc && invNo && `${importLocalNext}?b2bLcId=${b2bLc}&invNo=${invNo}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { piDetails, lcDetail } = (await queryFulfilled)?.data;

          dispatch(
            setLocalInvoice({
              key: "piDetails",
              value: piDetails?.map((e, i) => ({
                ...e,
                id: i + 1,
              })),
            })
          );
          dispatch(setLocalInvoice({ key: "lcDetails", value: lcDetail }));
          dispatch(setLocalInvoice({ key: "localNextLoading", value: true }));
        } catch (err) {
          dispatch(setLocalInvoice({ key: "localNextLoading", value: false }));
        } finally {
          dispatch(setLocalInvoice({ key: "localNextLoading", value: false }));
        }
      },
    }),
    getUnit: builder.query({
      query: () => getUnitUrl,
    }),
    getAllImportLocal: builder.query({
      query: (user) => user && `${getImportLocal}?userName=${user}`,
    }),
  }),
});

export const {
  useGetLocalSupplierQuery,
  useLazyGetLocalB2bQuery,
  useLazyGetLocalPiListQuery,
  useLazyGetLocalPiSelectedListQuery,
  useLazyGetLocalPiDeleteQuery,
  useLazyNextImportLocalQuery,
  useGetUnitQuery,

  useGetAllImportLocalQuery,
} = localQuery;
