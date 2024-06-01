import {
  get_export_add_view_data,
  get_export_buyer,
  get_export_color,
  get_export_company,
  get_export_data,
  get_export_delivery_to,
  get_export_depo_name,
  get_export_floor,
  get_export_gmt_qty,
  get_export_po_no,
  get_export_production_country,
  get_export_sewing_factory,
  get_export_ship_country,
  get_export_ship_mode,
  get_export_style,
  get_export_unit,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const exportChallanQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getExportSewingFactory: builder.query({
      query: () => get_export_sewing_factory,
    }),
    getExportBuyer: builder.query({
      query: (id) => id && `${get_export_buyer}?comID=${id}`,
    }),
    getExportStyle: builder.query({
      query: ({ id, buyer }) =>
        id && buyer && `${get_export_style}?comID=${id}&buyerID=${buyer}`,
    }),
    getExportDeliverTo: builder.query({
      query: () => get_export_delivery_to,
    }),
    getExportDepoName: builder.query({
      query: () => get_export_depo_name,
    }),
    getExportPo: builder.query({
      query: ({ id, style }) =>
        id && style && `${get_export_po_no}?comID=${id}&styleID=${style}`,
    }),
    getExportProductionCountry: builder.query({
      query: ({ id, style, po }) =>
        id &&
        style &&
        po &&
        `${get_export_production_country}?comID=${id}&styleID=${style}&poID=${po}`,
    }),
    getExportShipCountry: builder.query({
      query: () => get_export_ship_country,
    }),
    getExportColor: builder.query({
      query: ({ id, style, po, country }) =>
        id &&
        style &&
        po &&
        country &&
        `${get_export_color}?comID=${id}&styleID=${style}&poID=${po}&countryID=${country}`,
    }),
    getExportCompany: builder.query({
      query: () => get_export_company,
    }),
    getExportFloor: builder.query({
      query: (id) => id && `${get_export_floor}?comID=${id}`,
    }),
    getExportShipMode: builder.query({
      query: () => get_export_ship_mode,
    }),
    getExportMgtQty: builder.query({
      query: () => get_export_gmt_qty,
    }),
    getExportUnit: builder.query({
      query: () => get_export_unit,
    }),
    getExportData: builder.query({
      query: ({ style, po, country, color }) =>
        style &&
        po &&
        color &&
        country &&
        `${get_export_data}?styleID=${style}&poID=${po}&colorID=${color}&countryID=${country}`,
    }),
    getExportAddViewData: builder.query({
      query: (user) => user && `${get_export_add_view_data}?UserName=${user}`,
    }),
  }),
});

export const {
  useGetExportSewingFactoryQuery,
  useGetExportBuyerQuery,
  useGetExportStyleQuery,
  useGetExportDeliverToQuery,
  useGetExportDepoNameQuery,
  useGetExportPoQuery,
  useGetExportProductionCountryQuery,
  useGetExportShipCountryQuery,
  useGetExportColorQuery,
  useGetExportCompanyQuery,
  useGetExportFloorQuery,
  useGetExportShipModeQuery,
  useGetExportMgtQtyQuery,
  useGetExportUnitQuery,
  useGetExportDataQuery,
  useGetExportAddViewDataQuery,
} = exportChallanQuery;
