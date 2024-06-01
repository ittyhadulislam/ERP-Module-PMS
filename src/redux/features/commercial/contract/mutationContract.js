import {
  contractCancel,
  contractRename,
  saveContractDetails,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";

const contractMutation = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveContract: builder.mutation({
      query: (data) => ({
        url: saveContractDetails,
        method: "POST",
        body: data,
      }),

      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const saveContractDetails = await queryFulfilled;
      //     console.log("saveContractDetails", saveContractDetails);
      //     // pessimistic update
      //     dispatch(
      //       apiSlice.util.updateQueryData(
      //         "getComAvailableStyle",
      //         undefined,
      //         (draft) => {
      //           console.log("draft", JSON.stringify(draft));
      //           draft = saveContractDetails.data.data;
      //         }
      //       )
      //     );
      //   } catch (err) {}
      // },
    }),
    renameContract: builder.mutation({
      query: (data) => ({
        url: contractRename,
        method: "POST",
        body: data,
      }),
    }),
    cancelContract: builder.mutation({
      query: ({ contract, user }) => ({
        url: `${contractCancel}?contractNo=${contract}&userName=${user}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSaveContractMutation,
  useRenameContractMutation,
  useCancelContractMutation,
} = contractMutation;
