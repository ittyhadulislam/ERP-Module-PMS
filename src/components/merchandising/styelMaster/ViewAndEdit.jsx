import React from "react";
import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";

const ViewAndEdit = () => {
  const viewColumns = [
    // {
    //   field: "id",
    //   headerName: "Report",
    //   accessor: "Report",
    //   align: "center",
    //   renderCell: (row) => {
    //     return (
    //       <Box>
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
    // { field: "cMainCategory", headerName: "Report", flex: 1 },
    {
      field: "gp_ref",
      headerName: "Challan/GP",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    { field: "com_nm", headerName: "Company", minWidth: 120, flex: 1 },
    { field: "dpt_nm", headerName: "Department", minWidth: 120, flex: 1 },
    {
      field: "gp_sent_to",
      headerName: "Delivery To",
      minWidth: 120,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "gp_carried",
      headerName: "Carried By",
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "gp_crt_nm",
      headerName: "created by",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "gp_crt_date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      maxWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];
  const data = [];
  return (
    <>
      <CustomTable
        columns={viewColumns}
        rows={data?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        // loading={isLoading}
        height={data?.length > 0 ? "auto" : "280px"}
      />
    </>
  );
};

export default ViewAndEdit;
