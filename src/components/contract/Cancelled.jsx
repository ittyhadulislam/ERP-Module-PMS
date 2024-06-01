import React from "react";
import CustomTable from "../table/CustomTable";
import { useGetComCancelledViewQuery } from "../../redux/features/commercial/contract/queryContract";
import { useSelector } from "react-redux";
import { formateDate } from "../../utils/formateDate";

const Cancelled = () => {
  const { company } = useSelector((state) => state.contract);
  const { data: viewData, isLoading: viewLoading } =
    useGetComCancelledViewQuery(company?.company_ID, {
      refetchOnMountOrArgChange: true,
    });

  const viewColumns = [
    // {
    //   field: "id",
    //   headerName: "Report",
    //   accessor: "Report",
    //   renderCell: (row) => {
    //     return (
    //       <Box sx={{ display: "flex", justifyContent: "center" }}>
    //         <span
    //           onClick={() => handleReport(row?.row)}
    //           style={{ color: "#1976d2", cursor: "pointer" }}
    //         >
    //           Report <BsFileEarmarkPdf color="red" />
    //         </span>
    //       </Box>
    //     );
    //   },
    //   minWidth: 80,
    //   maxWidth: 80,
    //   flex: 1,
    // },
    // { field: "cMainCatedgory", headerName: "Select", minWidth: 60, flex: 1 },
    {
      field: "fileNo",
      headerName: "file/job",
      minWidth: 70,
      flex: 1,
    },

    { field: "cContractNo", headerName: "Contract", minWidth: 100, flex: 1 },
    { field: "amandmentNO", headerName: "ADM", minWidth: 50, flex: 1 },
    {
      field: "bank_Name",
      headerName: "Receiving Bank",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "negotiableBank",
      headerName: "Lien Bank",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "issuingBank",
      headerName: "Issuing Bank",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    { field: "b2BLc", headerName: "B2B Limit(%)", minWidth: 100, flex: 1 },

    {
      field: "dOpeningDate",
      headerName: "Opening Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "dAmendmentDate",
      headerName: "Amendment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "dLastShipDate",
      headerName: "Last Shipment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "dExpireDate",
      headerName: "Expiry Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "created_User",
      headerName: "created by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "created_Date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "edit_User",
      headerName: "Edited by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "edit_date",
      headerName: "Edited date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "amd_User",
      headerName: "AMD by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "amd_date",
      headerName: "AMD date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "cancelledBy",
      headerName: "Cancelled by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "cancelledDate",
      headerName: "Cancelled date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];

  const tableData = viewData?.data?.map((e, i) => ({ ...e, id: i + 1 }));
  return (
    <>
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        loading={viewLoading}
        height={tableData?.length > 0 ? "auto" : "280px"}
      />
    </>
  );
};

export default Cancelled;
