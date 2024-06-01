import { daily_finishing_report } from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const finishingReportQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDailyFinishingReport: builder.query({
      query: ({ id, date, user }) =>
        id &&
        date &&
        user && {
          url: `${daily_finishing_report}&comID=${id}&date=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
  }),
});

export const {
  useGetDailyFinishingReportQuery,
  useLazyGetDailyFinishingReportQuery,
} = finishingReportQuery;
