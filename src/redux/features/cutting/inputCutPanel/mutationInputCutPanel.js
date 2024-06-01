import {
  complete_input_barcode,
  complete_input_cut_panel,
  delete_input_barcode,
  delete_input_cut_panel,
  save_input_barcode,
  save_input_cut_panel,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const inputCutPanelMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveInputCutPanel: builder.mutation({
      query: (data) => ({
        url: save_input_cut_panel,
        method: "POST",
        body: data,
      }),
    }),
    deleteInputCutPanel: builder.mutation({
      query: (id) => ({
        url: id && `${delete_input_cut_panel}?inref=${id}`,
        method: "DELETE",
      }),
    }),
    completeInputCutPanel: builder.mutation({
      query: (data) => ({
        url: complete_input_cut_panel,
        method: "PUT",
        body: data,
      }),
    }),
    //below this all mutation for barcode generate
    saveInputBarcode: builder.mutation({
      query: (data) => ({
        url: save_input_barcode,
        method: "POST",
        body: data,
      }),
    }),
    deleteInputBarcode: builder.mutation({
      query: (id) => ({
        url: id && `${delete_input_barcode}?inref=${id}`,
        method: "DELETE",
      }),
    }),
    completeInputBarcode: builder.mutation({
      query: (data) => ({
        url: complete_input_barcode,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveInputCutPanelMutation,
  useDeleteInputCutPanelMutation,
  useCompleteInputCutPanelMutation,
  useSaveInputBarcodeMutation,
  useDeleteInputBarcodeMutation,
  useCompleteInputBarcodeMutation,
} = inputCutPanelMutation;
