import {
  complete_export_data,
  delete_export_data,
  save_export_data,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const exportChallanMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveExportData: builder.mutation({
      query: (data) => ({
        url: save_export_data,
        method: "POST",
        body: data,
      }),
    }),
    deleteExportData: builder.mutation({
      query: (id) => ({
        url: `${delete_export_data}?refID=${id}`,
        method: "DELETE",
        // body: data,
      }),
    }),
    completeExportData: builder.mutation({
      query: (data) => ({
        url: complete_export_data,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveExportDataMutation,
  useDeleteExportDataMutation,
  useCompleteExportDataMutation,
} = exportChallanMutation;
