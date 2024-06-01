import {
  GetFinalDestination,
  getAllCompany,
  getPortOfLoading,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";

const exportInvoiceQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCompany: builder.query({
      query: () => getAllCompany,
    }),
    getPortOfLoading: builder.query({
      query: () => getPortOfLoading,
    }),
    GetFinalDestination: builder.query({
      query: () => GetFinalDestination,
    }),
  }),
});

export const {
  useGetAllCompanyQuery,
  useGetPortOfLoadingQuery,
  useGetFinalDestinationQuery,
} = exportInvoiceQuery;
