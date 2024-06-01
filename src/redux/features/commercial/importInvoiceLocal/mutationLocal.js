import {
  saveImportLocal,
  selectLocalGrn,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";
import { setLocalInvoice } from "./localSlice";

const localMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveImportLocal: builder.mutation({
      query: (data) => ({
        url: selectLocalGrn,
        method: "POST",
        body: data,
      }),
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
          const { grnList, addGrnList } = err?.error?.data;
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
        } finally {
          dispatch(setLocalInvoice({ key: "grnLoading", value: false }));
          dispatch(setLocalInvoice({ key: "addGrnLoading", value: false }));
        }
      },
    }),
    saveImportLocalAll: builder.mutation({
      query: (data) => ({
        url: saveImportLocal,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveImportLocalMutation, useSaveImportLocalAllMutation } =
  localMutation;
