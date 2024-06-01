import {
  B2bOtherChargeSave,
  b2bTransferSave,
  cancelB2B,
  renameB2b,
  saveB2BLC,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";

const backToBackLCMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveOtherChange: builder.mutation({
      query: (data) => ({
        url: B2bOtherChargeSave,
        method: "POST",
        body: data,
      }),
    }),
    saveB2BLC: builder.mutation({
      query: (data) => ({
        url: saveB2BLC,
        method: "POST",
        body: data,
      }),
    }),
    cancel: builder.mutation({
      query: ({ bblc, user }) => ({
        url: `${cancelB2B}?bblcno=${bblc}&userName=${user}`,
        method: "POST",
        // body: data,
      }),
    }),
    transfer: builder.mutation({
      query: ({ fromId, toId, fromB2bId }) => ({
        url: `${b2bTransferSave}?MlcFormId=${fromId}&MlcToId=${toId}&formB2bId=${fromB2bId}`,
        method: "POST",
        // body: data,
      }),
    }),
    rename: builder.mutation({
      query: ({ b2bId, txt }) => ({
        url: `${renameB2b}?b2bId=${b2bId}&renameText=${txt}`,
        method: "POST",
        // body: data,
      }),
    }),
  }),
});

export const {
  useSaveOtherChangeMutation,
  useSaveB2BLCMutation,
  useCancelMutation,
  useTransferMutation,
  useRenameMutation,
} = backToBackLCMutation;
