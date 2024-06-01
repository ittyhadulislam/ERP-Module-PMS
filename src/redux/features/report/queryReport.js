import {
  cutting_report,
  cutting_report_po_wise,
  cutting_report_style_po_lay_wise,
  cutting_report_style_wise,
  cutting_report_style_wise_closing,
  cutting_summery_D2D_report,
  daily_input_report,
  daily_sewing_report,
  input_report_floor_line_wise,
  input_report_po_and_line_wise,
  input_report_po_wise,
  input_report_style_wise,
  input_summery_by_D2D_report,
  input_to_sewing_wip_report,
  no_scan_barcode_report,
  sewing_closing_report_style_wise,
  sewing_report_country_wise,
  sewing_report_daily_variance,
  sewing_report_po_wise,
  sewing_report_style_and_po_wise,
  sewing_report_style_wise,
} from "../../../apiRoutes";
import { apiSlice } from "../../api/apiSlice";

const reportQuery = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDailyCuttingReport: builder.query({
      query: ({ id, date, type = "pdf", user }) =>
        id &&
        date &&
        user &&
        type && {
          url: `${cutting_report}?comID=${id}&CutDate=${date}&userName=${user}&reportType=${type}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getCuttingSummeryD2DReport: builder.query({
      query: ({ id, fromDate, toDate, type = "pdf", user }) =>
        id &&
        fromDate &&
        toDate &&
        user && {
          url: `${cutting_summery_D2D_report}?reportType=${type}&comID=${id}&fromdate=${fromDate}&todate=${toDate}&userName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getCuttingReportStyleWise: builder.query({
      query: ({ id, styleId, style, type = "pdf", user }) =>
        id &&
        styleId &&
        style &&
        user && {
          url: `${cutting_report_style_wise}?reportType=${type}&comID=${id}&styleID=${styleId}&style=${style}&userName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getCuttingReportPoWise: builder.query({
      query: ({ id, styleId, style, poId, po, type = "pdf", user }) =>
        id &&
        styleId &&
        style &&
        poId &&
        po &&
        user && {
          url: `${cutting_report_po_wise}?reportType=${type}&comID=${id}&styleID=${styleId}&style=${style}&poID=${poId}&PO=${po}&userName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),

    getCuttingReportStyleWiseClosing: builder.query({
      query: ({ id, styleId, style, type = "pdf", user }) =>
        id &&
        styleId &&
        style &&
        user && {
          url: `${cutting_report_style_wise_closing}?reportType=${type}&comID=${id}&styleID=${styleId}&style=${style}&userName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getCuttingReportStylePoLay: builder.query({
      query: ({ id, style, po, lay, type = "pdf", user }) =>
        id &&
        style &&
        po &&
        lay &&
        user && {
          url: `${cutting_report_style_po_lay_wise}?reportType=${type}&comID=${id}&style=${style}&po=${po}&lay=${lay}&userName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),

    getSewingReportStyleWise: builder.query({
      query: ({ id, styleId, style, type = "pdf", user }) =>
        id &&
        styleId &&
        type &&
        user && {
          url: `${sewing_report_style_wise}?reportType=${type}&comID=${id}&styleId=${styleId}&style=${style}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getSewingClosingReportStyleWise: builder.query({
      query: ({ id, styleId, style, type = "pdf", user }) =>
        id &&
        styleId &&
        type &&
        user && {
          url: `${sewing_closing_report_style_wise}?reportType=${type}&comID=${id}&styleId=${styleId}&style=${style}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getDailySewingReport: builder.query({
      query: ({ id, date, type = "pdf", user }) =>
        id &&
        date &&
        user &&
        type && {
          url: `${daily_sewing_report}?reportType=${type}&comID=${id}&SewingDate=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getSewingReportStyleAndPoWise: builder.query({
      query: ({ id, styleId, style, poID, PONo, type = "pdf", user }) =>
        id &&
        styleId &&
        poID &&
        user && {
          url: `${sewing_report_style_and_po_wise}?reportType=${type}&comID=${id}&styleId=${styleId}&style=${style}&poID=${poID}&PONo=${PONo}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getSewingReportPoWise: builder.query({
      query: ({ id, styleId, style, poID, PONo, type = "pdf", user }) =>
        id &&
        styleId &&
        poID &&
        user && {
          url: `${sewing_report_po_wise}?reportType=${type}&comID=${id}&styleId=${styleId}&style=${style}&poID=${poID}&PONo=${PONo}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getSewingReportCountryWise: builder.query({
      query: ({
        id,
        styleId,
        style,
        poID,
        PONo,
        countryId,
        type = "pdf",
        user,
      }) =>
        id &&
        styleId &&
        poID &&
        countryId &&
        user && {
          url: `${sewing_report_country_wise}?reportType=${type}&comID=${id}&styleId=${styleId}&style=${style}&poID=${poID}&PONo=${PONo}&countryID=${countryId}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getSeeingReportDailyVariance: builder.query({
      query: ({ id, date, type = "pdf", user }) =>
        id &&
        date &&
        type &&
        user && {
          url: `${sewing_report_daily_variance}?reportType=${type}&comID=${id}&Daily=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getDailyInputReport: builder.query({
      query: ({ id, date, type = "pdf", user }) =>
        id &&
        date &&
        user && {
          url: `${daily_input_report}?reportType=${type}&comID=${id}&daily=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getInputWipReport: builder.query({
      query: ({ id, date, type = "pdf", user }) =>
        id &&
        date &&
        user && {
          url: `${input_to_sewing_wip_report}?reportType=${type}&comID=${id}&daily=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getInputSummeryByD2DReport: builder.query({
      query: ({ id, fromDate, toDate, type = "pdf", user }) =>
        id &&
        fromDate &&
        toDate &&
        user && {
          url: `${input_summery_by_D2D_report}?reportType=${type}&comID=${id}&fromdate=${fromDate}&todate=${toDate}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getInputReportStyleWise: builder.query({
      query: ({ id, styleID, style, type = "pdf", user }) =>
        id &&
        styleID &&
        style &&
        type &&
        user && {
          url: `${input_report_style_wise}?reportType=${type}&comID=${id}&styleID=${styleID}&style=${style}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getInputReportPoWise: builder.query({
      query: ({ id, styleID, style, pono, poID, type = "pdf", user }) =>
        id &&
        styleID &&
        style &&
        poID &&
        pono &&
        type &&
        user && {
          url: `${input_report_po_wise}?reportType=${type}&comID=${id}&styleID=${styleID}&style=${style}&poID=${poID}&pono=${pono}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getInputReportPoLineWise: builder.query({
      query: ({ id, styleID, style, pono, poID, type = "pdf", user }) =>
        id &&
        styleID &&
        style &&
        poID &&
        pono &&
        type &&
        user && {
          url: `${input_report_po_and_line_wise}?reportType=${type}&comID=${id}&styleID=${styleID}&style=${style}&poID=${poID}&pono=${pono}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getInputReportFloorLineWise: builder.query({
      query: ({ id, floorID, floor, date, type = "pdf", user }) =>
        id &&
        floorID &&
        floor &&
        date &&
        user && {
          url: `${input_report_floor_line_wise}?reportType=${type}&comID=${id}&floorID=${floorID}&floor=${floor}&date=${date}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
    getNoScanBarcodeReport: builder.query({
      query: ({ id, challan, type = "pdf", user }) =>
        id &&
        challan &&
        user && {
          url: `${no_scan_barcode_report}?reportType=${type}&comID=${id}&challan=${challan}&UserName=${user}`,
          responseHandler: async (response) => {
            if (type === "EXCEL" || type === "WORD") {
              const blob = await response.blob();
              const link = document.createElement("a");
              // Set the download attribute with the desired file name
              link.download = `download.${type === "EXCEL" ? "xlsx" : "docx"}`;
              // Create a URL for the blob and set it as the link's href
              link.href = window.URL.createObjectURL(blob);
              // Append the link to the document
              document.body.appendChild(link);
              // Trigger a click on the link to start the download
              link.click();
              // Remove the link from the document
              document.body.removeChild(link);
            } else {
              const blob = await response.blob();
              const file = new Blob([blob], { type: "application/pdf" });
              return window.URL.createObjectURL(file);
            }
          },
        },
    }),
  }),
});

export const {
  //
  useLazyGetDailyCuttingReportQuery,
  useLazyGetCuttingSummeryD2DReportQuery,
  useLazyGetCuttingReportStyleWiseQuery,
  useLazyGetCuttingReportPoWiseQuery,
  useLazyGetCuttingReportStylePoLayQuery,
  useLazyGetCuttingReportStyleWiseClosingQuery,
  //
  useLazyGetSewingReportStyleWiseQuery,
  useLazyGetSewingClosingReportStyleWiseQuery,
  useLazyGetDailySewingReportQuery,
  useGetSewingReportStyleAndPoWiseQuery,
  useLazyGetSewingReportStyleAndPoWiseQuery,
  useLazyGetSeeingReportDailyVarianceQuery,
  useLazyGetSewingReportPoWiseQuery,
  useLazyGetSewingReportCountryWiseQuery,
  //
  useLazyGetDailyInputReportQuery,
  useLazyGetInputWipReportQuery,
  useLazyGetInputSummeryByD2DReportQuery,
  useLazyGetInputReportStyleWiseQuery,
  useLazyGetInputReportPoWiseQuery,
  useLazyGetInputReportPoLineWiseQuery,
  useLazyGetInputReportFloorLineWiseQuery,
  useLazyGetNoScanBarcodeReportQuery,
} = reportQuery;
