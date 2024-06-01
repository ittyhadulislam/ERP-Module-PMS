import React from "react";
import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";

const EditAndViewTab = () => {
  // table columns
  const columns = [
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
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "gp_st_desc",
      headerName: "Status",
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "crtby",
      headerName: "created by",
      minWidth: 90,
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
  return (
    <>
      <CustomTable
        // rows={company ? data?.map((e, i) => ({ ...e, id: i + 1 })) : []}
        rows={[]}
        height={[]?.length > 0 ? "auto" : "280px"}
        // checkboxSelection
        // setSelectedRows={setSelectedRows}
        columns={columns}
        // loading={isLoading}
        // isSuccess={checkSuccess || cancelSuccess || returnSuccess}
      />
    </>
  );
};

export default EditAndViewTab;
