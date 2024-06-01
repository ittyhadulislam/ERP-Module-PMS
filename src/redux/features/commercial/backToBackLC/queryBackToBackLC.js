import {
  GetAvailablePIDetails,
  GetB2bOtherCharge,
  GetMasterLcChangeData,
  GetOtherChargeByB2B,
  getAllAmendment,
  getAllB2BForEdit,
  getAmendmentDetails,
  getB2BSelectedData,
  getB2bInfoByMaserLc,
  getBackToBackLc,
  getCancelB2b,
  getLcIssuingBankInfo,
  getMasterLcNo,
  getPiDetailsForModal,
  getSupplier,
} from "../../../../apiRoutes/commercial";
import { apiSlice } from "../../../api/apiSlice";
import { setBackToBack } from "./backToBackLcSlice";

const backToBackLCQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLcIssuingBank: builder.query({
      query: (id) => id && `${getLcIssuingBankInfo}?companyID=${id}`,
    }),
    getMasterLcNo: builder.query({
      query: (id) => id && `${getMasterLcNo}?companyID=${id}`,
    }),
    getSupplier: builder.query({
      query: () => getSupplier,
    }),
    GetMasterLcChangeData: builder.query({
      query: (id) => id && `${GetMasterLcChangeData}?MLC=${id}`,
    }),
    GetAvailablePIDetails: builder.query({
      query: ({ bblcno, supid, compid }) =>
        bblcno &&
        supid &&
        compid &&
        `${GetAvailablePIDetails}?bblcno=${bblcno}&supid=${supid}&compid=${compid}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = (await queryFulfilled).data?.data;
          dispatch(setBackToBack({ key: "availablePIData", value: result }));
        } catch (err) {
          dispatch(setBackToBack({ key: "availablePIData", value: [] }));
        }
      },
    }),
    GetB2bOtherCharge: builder.query({
      query: () => GetB2bOtherCharge,
    }),
    getB2BSelected: builder.query({
      query: ({ bblcno, compid }) =>
        bblcno &&
        compid &&
        `${getB2BSelectedData}?bblcno=${bblcno}&compid=${compid}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = (await queryFulfilled).data?.data;
          dispatch(
            setBackToBack({
              key: "existingAvailablePIData",
              value: result?.dataAvailablePI,
            })
          );
          dispatch(
            setBackToBack({
              key: "existingChargeData",
              value: result?.dataCharges,
            })
          );
          dispatch(
            setBackToBack({
              key: "existingBackToBackFieldsData",
              value: result?.dataBackToBack,
            })
          );
          dispatch(setBackToBack({ key: "availablePILoading", value: true }));
        } catch (err) {
          dispatch(
            setBackToBack({
              key: "existingAvailablePIData",
              value: [],
            })
          );
          dispatch(
            setBackToBack({
              key: "existingChargeData",
              value: [],
            })
          );
          dispatch(
            setBackToBack({
              key: "existingBackToBackFieldsData",
              value: [],
            })
          );
          dispatch(setBackToBack({ key: "availablePILoading", value: false }));
        } finally {
          dispatch(setBackToBack({ key: "availablePILoading", value: false }));
        }
      },
    }),
    GetExistingB2bOtherCharge: builder.query({
      query: (b2b) => b2b && `${GetOtherChargeByB2B}?bblcno=${b2b}`,
    }),
    GetEditAndViewLc: builder.query({
      query: (id) => id && `${getAllB2BForEdit}?companyID=${id}`,
    }),
    getAllAmendmentData: builder.query({
      query: ({ bblc, company }) =>
        bblc &&
        company &&
        `${getAllAmendment}?bblcno=${bblc}&compid=${company}`,
    }),
    getAmendmentDetails: builder.query({
      query: ({ bblc, amd }) =>
        `${getAmendmentDetails}?bblcno=${bblc}&amd=${amd}`,
    }),
    GetPiModalData: builder.query({
      query: (id) => id && `${getPiDetailsForModal}?poNum=${id}`,
    }),
    GetB2bInfo: builder.query({
      query: (id) => id && `${getB2bInfoByMaserLc}?MLC=${id}`,
    }),
    GetB2bLc: builder.query({
      query: (id) => id && `${getBackToBackLc}?MLC=${id}`,
    }),
    GetB2bCancel: builder.query({
      query: (id) => id && `${getCancelB2b}?companyID=${id}`,
    }),
  }),
});

export const {
  useLazyGetLcIssuingBankQuery,
  useLazyGetMasterLcNoQuery,
  useGetSupplierQuery,
  useLazyGetMasterLcChangeDataQuery,
  useLazyGetAvailablePIDetailsQuery,
  useGetB2bOtherChargeQuery,
  useLazyGetB2BSelectedQuery,
  useLazyGetExistingB2bOtherChargeQuery,
  useLazyGetEditAndViewLcQuery,
  useLazyGetAllAmendmentDataQuery,
  useLazyGetAmendmentDetailsQuery,
  useLazyGetPiModalDataQuery,
  useLazyGetB2bInfoQuery,
  useLazyGetB2bLcQuery,
  useLazyGetB2bCancelQuery,
} = backToBackLCQuery;
