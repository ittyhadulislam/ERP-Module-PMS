import {
  get_hourly_production_dashboard,
  get_hourly_production_report,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const hourlyProductionQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getHourlyProductionDashboard: builder.query({
      query: ({ id, date }) =>
        id &&
        date &&
        `${get_hourly_production_dashboard}?comID=${id}&date=${date}`,
    }),
    getHourlyProductionReport: builder.query({
      query: ({ id, date, user }) =>
        id &&
        date &&
        user && {
          url: `${get_hourly_production_report}&comID=${id}&date=${date}&UserName=${user}`,
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
  useGetHourlyProductionDashboardQuery,
  useGetHourlyProductionReportQuery,
} = hourlyProductionQuery;
