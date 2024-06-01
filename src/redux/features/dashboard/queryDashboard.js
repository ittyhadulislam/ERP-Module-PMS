import {
  get_dashboard_bar,
  get_dashboard_pie,
  get_dashboard_style,
} from "../../../apiRoutes";
import { apiSlice } from "../../api/apiSlice";

const dashboardQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDashboardStyle: builder.query({
      query: (id) => id && `${get_dashboard_style}?comID=${id}`,
    }),

    getDashboardPie: builder.query({
      query: (id) => id && `${get_dashboard_pie}?comID=${id}`,
    }),
    getDashboardBar: builder.query({
      query: (id) => id && `${get_dashboard_bar}?comID=${id}`,
    }),
  }),
});

export const {
  useGetDashboardStyleQuery,
  useGetDashboardPieQuery,
  useGetDashboardBarQuery,
} = dashboardQuery;
