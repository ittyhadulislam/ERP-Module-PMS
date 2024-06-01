import { saveImportForeign, selectGrn } from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";
import { setForeignInvoice } from "./foreignSlice";

const foreignMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveImportForeign: builder.mutation({
      query: (data) => ({
        url: selectGrn,
        method: "POST",
        body: data,
      }),
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
          const { grnList, addGrnList } = err?.error?.data;
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
        } finally {
          dispatch(setForeignInvoice({ key: "grnLoading", value: false }));
          dispatch(setForeignInvoice({ key: "addGrnLoading", value: false }));
        }
      },
    }),
    saveImportForeignAll: builder.mutation({
      query: (data) => ({
        url: saveImportForeign,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveImportForeignMutation, useSaveImportForeignAllMutation } =
  foreignMutation;
