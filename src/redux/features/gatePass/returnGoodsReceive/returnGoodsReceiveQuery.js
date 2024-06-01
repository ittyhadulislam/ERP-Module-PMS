import {
  ger_general_veiw_return_goods_receive_gate_pass,
  ger_merchant_veiw_return_goods_receive_gate_pass,
  ger_report_return_goods_receive_gate_pass,
  get_return_goods_receive,
  get_return_goods_receive_gate_pass,
  get_return_goods_receive_section,
  get_return_goods_receive_view,
  get_return_goods_receive_view_after_add,
} from "../../../../apiRoutes";
import { apiSlice } from "../../../api/apiSlice";

const returnGoodsReceive = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReturnCategory: builder.query({
      query: () => `${get_return_goods_receive}`,
    }),
    getReturnSection: builder.query({
      query: ({ id, category }) =>
        `${get_return_goods_receive_section}?comID=${id}&catID=${category}`,
    }),
    getReturnGatePass: builder.query({
      query: ({ id, category, section }) =>
        `${get_return_goods_receive_gate_pass}?comID=${id}&catID=${category}&sectionID=${section}`,
    }),
    getReturnView: builder.query({
      query: (id) => `${get_return_goods_receive_view}?gpNo=${id}`,
    }),
    getReturnViewAfterAdd: builder.query({
      query: (id) =>
        `${get_return_goods_receive_view_after_add}?UserName=${id}`,
    }),
    getReturnGeneralView: builder.query({
      query: (id) =>
        `${ger_general_veiw_return_goods_receive_gate_pass}?comID=${id}`,
    }),
    getReturnMerchantView: builder.query({
      query: (id) =>
        `${ger_merchant_veiw_return_goods_receive_gate_pass}?comID=${id}`,
    }),
    getReturnGoodsReport: builder.query({
      query: ({ id, gpId, user }) =>
        id &&
        gpId &&
        user && {
          url: `${ger_report_return_goods_receive_gate_pass}&comID=${id}&gprID=${gpId}&UserName=${user}`,
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
  useGetReturnCategoryQuery,
  useLazyGetReturnSectionQuery,
  useLazyGetReturnGatePassQuery,
  useLazyGetReturnViewQuery,
  useGetReturnViewAfterAddQuery,
  useGetReturnGeneralViewQuery,
  useGetReturnMerchantViewQuery,
  useLazyGetReturnGoodsReportQuery,
} = returnGoodsReceive;
