import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomTable from "../table/CustomTable";

const Approved = () => {
  const viewColumns = [
    {
      field: "si_id",
      headerName: "BBLC No",
      minWidth: 100,
      flex: 1,
    },
    { field: "si_nm", headerName: "Invoice No.", minWidth: 100, flex: 1 },
    {
      field: "si_nqm",
      headerName: "Accept Value",
      minWidth: 65,
      maxWidth: 65,
      flex: 1,
    },
    { field: "sn_type", headerName: "Accepted Date", minWidth: 150, flex: 1 },
    { field: "si_ndm", headerName: "Maturity Date", minWidth: 100, flex: 1 },
    { field: "si_nsmd", headerName: "Payment Mode", minWidth: 100, flex: 1 },
    { field: "si_nmd", headerName: "Remarks", minWidth: 100, flex: 1 },
  ];
  return (
    <>
      <CustomAppBar title={"Approved"} />
      <CustomTable
        columns={viewColumns}
        rows={[]}
        // loading={isApprovalLoading}
        height={[]?.length > 0 ? "auto" : "270px"}
      />
    </>
  );
};

export default Approved;
