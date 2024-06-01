import { getCompanyInfo } from "../../../apiRoutes";
import { apiSlice } from "../../api/apiSlice";

export const masterSetupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => getCompanyInfo,
    }),
  }),
});

export const { useGetCompanyQuery } = masterSetupApi;
