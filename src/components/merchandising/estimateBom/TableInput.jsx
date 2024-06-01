import React from "react";
import CustomTable from "../../table/CustomTable";

const TableInput = () => {
  const viewColumns = [
    {
      field: "gp_ref",
      headerName: "Master Category",
      minWidth: 100,
      flex: 1,
    },
    { field: "com_nm", headerName: "Main Category", minWidth: 120, flex: 1 },
    { field: "dpt_nm", headerName: "Sub Category", minWidth: 120, flex: 1 },
    {
      field: "gp_sent_to",
      headerName: "Construction",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "gp_carried",
      headerName: "dimension",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "gp_crt_nm",
      headerName: "Gmt Qty",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "gp_crt_nmq",
      headerName: "Order Unit",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "gp_crt_nmwq",
      headerName: "Cons. Unit",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "gp_crt_nmw.q",
      headerName: "Cons",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "d.q",
      headerName: "Wstg",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "jhfjidsh",
      headerName: "Rate",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "valeue",
      headerName: "Value",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "reqqty",
      headerName: "Req Qty",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "paymode",
      headerName: "Pay Mode",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "remarks",
      headerName: "Save",
      minWidth: 90,
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

export default TableInput;
