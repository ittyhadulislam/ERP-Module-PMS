import {
  approveAcceptanceForApp,
  confirmAcceptanceForApp,
  deleteAcceptance,
  reviseAcceptanceForApp,
  saveAcceptance,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";

const acceptanceMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveAcceptance: builder.mutation({
      query: (data) => ({
        url: saveAcceptance,
        method: "POST",
        body: data,
      }),
    }),
    deleteAcceptance: builder.mutation({
      query: ({ mlc, b2b, invNo }) => ({
        url: `${deleteAcceptance}?MLC=${mlc}&B2BId=${b2b}&InvNo=${invNo}`,
        method: "DELETE",
        // body: data,
      }),
    }),
    confirmAcceptanceForApp: builder.mutation({
      query: ({ invNo, user }) => ({
        url: `${confirmAcceptanceForApp}?invNo=${invNo}&userName=${user}`,
        method: "PUT",
        // body: data,
      }),
    }),
    approveAcceptanceForApp: builder.mutation({
      query: ({ invNo, user }) => ({
        url: `${approveAcceptanceForApp}?invNo=${invNo}&userName=${user}`,
        method: "PUT",
        // body: data,
      }),
    }),
    reviseAcceptanceForApp: builder.mutation({
      query: ({ invNo, user }) => ({
        url: `${reviseAcceptanceForApp}?invNo=${invNo}&userName=${user}`,
        method: "PUT",
        // body: data,
      }),
    }),
  }),
});

export const {
  useSaveAcceptanceMutation,
  useDeleteAcceptanceMutation,
  useConfirmAcceptanceForAppMutation,
  useApproveAcceptanceForAppMutation,
  useReviseAcceptanceForAppMutation,
} = acceptanceMutation;
