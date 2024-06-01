import {
  get_input_barcode_add_view,
  get_input_color,
  get_input_country,
  get_input_cut_no,
  get_input_cut_panel_add_view,
  get_input_cut_panel_report,
  get_input_cut_panel_view,
  get_input_floor,
  get_input_line,
  get_input_po,
  get_input_style,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const inputCutPanelQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getInputStyle: builder.query({
      query: (id) => id && `${get_input_style}?comID=${id}`,
    }),
    getInputPo: builder.query({
      query: ({ id, Style }) =>
        id && Style && `${get_input_po}?comID=${id}&Style=${Style}`,
    }),
    getInputCountry: builder.query({
      query: ({ id, style, po }) =>
        id &&
        style &&
        po &&
        `${get_input_country}?comID=${id}&Style=${style}&PO=${po}`,
    }),
    getInputColor: builder.query({
      query: ({ id, style, po, country }) =>
        id &&
        style &&
        po &&
        country &&
        `${get_input_color}?comID=${id}&Style=${style}&PO=${po}&country=${country}`,
    }),
    getInputFloor: builder.query({
      query: (id) => id && `${get_input_floor}?comID=${id}`,
    }),
    getInputLine: builder.query({
      query: ({ id, floor }) =>
        id && floor && `${get_input_line}?comID=${id}&Floor=${floor}`,
    }),
    getInputCutNo: builder.query({
      query: ({ id, style, po, country, color }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        `${get_input_cut_no}?comID=${id}&Style=${style}&po=${po}&color=${color}&country=${country}`,
    }),
    getInputCutPanelView: builder.query({
      query: ({ id, style, po, country, color }) =>
        id &&
        style &&
        po &&
        country &&
        color &&
        `${get_input_cut_panel_view}?comID=${id}&StyleID=${style}&po=${po}&colorID=${color}&countryID=${country}`,
    }),
    getInputCutPanelAddView: builder.query({
      query: ({ style, user }) =>
        style &&
        user &&
        `${get_input_cut_panel_add_view}?Style=${style}&UserName=${user}`,
    }),

    getInputCutReport: builder.query({
      query: ({ id, style, po, user }) =>
        id &&
        style &&
        po &&
        user && {
          url: `${get_input_cut_panel_report}&comID=${id}&style=${style}&po=${po}&UserName=${user}`,
          // transformResponse: (response) => {CuttingReport/Cut_Style_CountryReport?reportType=pdf&comID=40&style=22&po=22&country=2
          //   return response.blob(); // Set the responseType to 'blob'
          // },
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new Blob([blob], { type: "application/pdf" });
            return window.URL.createObjectURL(file);
          },
        },
    }),
    // below this all api for barcode
    getInputBarcodeAddView: builder.query({
      query: ({ style, user }) =>
        style &&
        user &&
        `${get_input_barcode_add_view}?Style=${style}&UserName=${user}`,
    }),
  }),
});

export const {
  useGetInputStyleQuery,
  useGetInputPoQuery,
  useGetInputCountryQuery,
  useGetInputColorQuery,
  useGetInputFloorQuery,
  useGetInputLineQuery,
  useGetInputCutNoQuery,
  useGetInputCutPanelViewQuery,
  useGetInputCutPanelAddViewQuery,
  useGetInputCutReportQuery,
  useGetInputBarcodeAddViewQuery,
} = inputCutPanelQuery;
