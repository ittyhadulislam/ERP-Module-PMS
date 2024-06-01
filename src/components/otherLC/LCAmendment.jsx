import React from "react";
import { formateDate } from "../../utils/formateDate";
import CustomTable from "../table/CustomTable";

const LCAmendment = () => {
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
    { field: "cMainCatedgory", headerName: "Select", minWidth: 60, flex: 1 },
    {
      field: "cMafinCatedgory",
      headerName: "AMD",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "si_totala_woraker",
      headerName: "Amendment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },

    { field: "si_ngdm", headerName: "Value", minWidth: 100, flex: 1 },
    { field: "sn_tyspe", headerName: "contract Value", minWidth: 50, flex: 1 },
    {
      field: "si_tasdotal_worker",
      headerName: "Expiry Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "sn_typdge",
      headerName: "Quantity (Pcs)",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "sn_typdged",
      headerName: "Quantity (+/-)",
      minWidth: 100,
      flex: 1,
    },

    {
      field: "si_createad_by",
      headerName: "created by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "si_creadsted_dt",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "si_cregated_by",
      headerName: "Edited by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "si_creadted_dt",
      headerName: "Edited date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];
  return (
    <>
      <CustomTable
        columns={viewColumns}
        rows={[]}
        // loading={isApprovalLoading}
        height={[]?.length > 0 ? "auto" : "280px"}
      />
    </>
  );
};

export default LCAmendment;
