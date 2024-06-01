import {
  get_gate_pass_add_view,
  get_gate_pass_add_view_details,
  get_gate_pass_add_view_report,
  get_gate_pass_company,
  get_gate_pass_department,
  get_gate_pass_section,
  get_gate_pass_status,
  get_gate_pass_store,
  get_gate_pass_type,
  get_gate_pass_unit,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const createGeneralGatePassQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getGatePassType: builder.query({
      query: () => get_gate_pass_type,
    }),
    getCompany: builder.query({
      query: () => get_gate_pass_company,
    }),
    getDepartment: builder.query({
      query: (id) => `${get_gate_pass_department}?comID=${id}`,
    }),
    getSection: builder.query({
      query: (id) => `${get_gate_pass_section}?deptID=${id}`,
    }),
    getStore: builder.query({
      query: (id) => `${get_gate_pass_store}?comID=${id}`,
    }),
    getUnit: builder.query({
      query: () => get_gate_pass_unit,
    }),
    getStatus: builder.query({
      query: () => get_gate_pass_status,
    }),
    getGeneralAddView: builder.query({
      query: ({ id, user }) =>
        id && user && `${get_gate_pass_add_view}?gptype=${id}&UserName=${user}`,
    }),
    getAddViewDetails: builder.query({
      query: ({ id, user }) =>
        id &&
        user &&
        `${get_gate_pass_add_view_details}?comID=${id}&UserName=${user}`,
    }),
    getAddViewReport: builder.query({
      query: (
        { id, gpNo, user } //&comID=40&gpNo=1046168&UserName=moin
      ) =>
        id &&
        gpNo &&
        user && {
          url: `${get_gate_pass_add_view_report}&comID=${id}&gpNo=${gpNo}&UserName=${user}`,
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
  useGetGatePassTypeQuery,
  useGetCompanyQuery,
  useLazyGetDepartmentQuery,
  useLazyGetSectionQuery,
  useLazyGetStoreQuery,
  useGetUnitQuery,
  useGetStatusQuery,
  useLazyGetGeneralAddViewQuery,
  useGetAddViewDetailsQuery,
  useLazyGetAddViewReportQuery,
} = createGeneralGatePassQuery;
