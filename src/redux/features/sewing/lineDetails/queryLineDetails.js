import {
  get_line_details_for_update,
  get_line_details_report,
  get_line_details_view,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const lineDetailsQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLineDetailsView: builder.query({
      query: ({ id, date }) =>
        id && date && `${get_line_details_view}?comID=${id}&date=${date}`,
    }),
    getLineDetailsUpdate: builder.query({
      query: ({ id, line, floor, date }) =>
        id &&
        line &&
        floor &&
        date &&
        `${get_line_details_for_update}?comID=${id}&lineID=${line}&floorId=${floor}&date=${date}`,
    }),

    getLineDetailsReport: builder.query({
      query: ({ id, date, user }) =>
        id &&
        date &&
        user && {
          url: `${get_line_details_report}&comID=${id}&date=${date}&UserName=${user}`,
          // transformResponse: (response) => {
          //   return response.blob(); // Set the responseType to 'blob'
          // },
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
  useGetLineDetailsViewQuery,
  useGetLineDetailsUpdateQuery,
  useGetLineDetailsReportQuery,
} = lineDetailsQuery;
