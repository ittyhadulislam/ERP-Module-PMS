import {
  getDeleteImportForeign,
  getForeignB2b,
  getForeignPiList,
  getForeignPiSelected,
  getForeignSupplier,
  getImportForeign,
  getUnitUrl,
  importForeignNext,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";
import { setForeignInvoice } from "./foreignSlice";

const foreignQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getForeignSupplier: builder.query({
      query: (user) => user && `${getForeignSupplier}?userName=${user}`,
    }),
    getForeignB2b: builder.query({
      query: (id) => id && `${getForeignB2b}?supId=${id}`,
    }),
    getForeignPiList: builder.query({
      query: (id) => id && `${getForeignPiList}?b2bId=${id}`,
    }),
    getForeignPiSelectedList: builder.query({
      query: (id) =>
        id && `${getForeignPiSelected}?piNo=${encodeURIComponent(id)}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = (await queryFulfilled).data?.data?.map((e, i) => ({
            ...e,
            id: i + 1,
          }));
          dispatch(setForeignInvoice({ key: "grnList", value: result }));
          dispatch(setForeignInvoice({ key: "grnLoading", value: true }));
        } catch (err) {
          dispatch(setForeignInvoice({ key: "grnLoading", value: false }));
        } finally {
          dispatch(setForeignInvoice({ key: "grnLoading", value: false }));
        }
      },
    }),
    getForeignPiDelete: builder.query({
      query: ({ Qty, InvNo, Itcode }) =>
        Qty &&
        InvNo &&
        Itcode &&
        `${getDeleteImportForeign}?Qty=${Qty}&InvNo=${InvNo}&Itcode=${Itcode}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { grnList, addGrnList } = (await queryFulfilled)?.data;
          dispatch(
            setForeignInvoice({
              key: "grnList",
              value: grnList?.map((e, i) => ({
                ...e,
                id: i + 1,
              })),
            })
          );
          dispatch(setForeignInvoice({ key: "grnLoading", value: true }));
          dispatch(
            setForeignInvoice({
              key: "addGrnList",
              value: addGrnList?.map((e, i) => ({
                ...e,
                id: i + 1,
              })),
            })
          );
          dispatch(setForeignInvoice({ key: "addGrnLoading", value: true }));
        } catch (err) {
          dispatch(setForeignInvoice({ key: "grnLoading", value: false }));
          dispatch(setForeignInvoice({ key: "addGrnLoading", value: false }));
          dispatch(setForeignInvoice({ key: "addGrnList", value: [] }));
        } finally {
          dispatch(setForeignInvoice({ key: "grnLoading", value: false }));
          dispatch(setForeignInvoice({ key: "addGrnLoading", value: false }));
        }
      },
    }),
    nextImportForeign: builder.query({
      query: ({ b2bLc, invNo }) =>
        b2bLc &&
        invNo &&
        `${importForeignNext}?b2bLcId=${b2bLc}&invNo=${invNo}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { piDetails, lcDetail } = (await queryFulfilled)?.data;

          dispatch(
            setForeignInvoice({
              key: "piDetails",
              value: piDetails?.map((e, i) => ({
                ...e,
                id: i + 1,
              })),
            })
          );
          dispatch(setForeignInvoice({ key: "lcDetails", value: lcDetail }));
          dispatch(
            setForeignInvoice({ key: "foreignNextLoading", value: true })
          );
        } catch (err) {
          dispatch(
            setForeignInvoice({ key: "foreignNextLoading", value: false })
          );
        } finally {
          dispatch(
            setForeignInvoice({ key: "foreignNextLoading", value: false })
          );
        }
      },
    }),
    getUnit: builder.query({
      query: () => getUnitUrl,
    }),
    getAllImportForeign: builder.query({
      query: (user) => user && `${getImportForeign}?userName=${user}`,
    }),
  }),
});

export const {
  useGetForeignSupplierQuery,
  useLazyGetForeignB2bQuery,
  useLazyGetForeignPiListQuery,
  useLazyGetForeignPiSelectedListQuery,
  useLazyGetForeignPiDeleteQuery,
  useLazyNextImportForeignQuery,
  useGetUnitQuery,
  useGetAllImportForeignQuery,
} = foreignQuery;
