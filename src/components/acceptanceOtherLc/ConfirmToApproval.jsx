import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomTable from "../table/CustomTable";

const ConfirmToApproval = () => {
  const viewColumns = [
    {
      field: "si_id",
      headerName: "Contract",
      minWidth: 100,
      flex: 1,
    },
    { field: "si_nm", headerName: "Style", minWidth: 100, flex: 1 },
    {
      field: "si_nqm",
      headerName: "Select",
      minWidth: 65,
      maxWidth: 65,
      flex: 1,
    },
    { field: "sn_type", headerName: "PO", minWidth: 150, flex: 1 },
    { field: "si_ndm", headerName: "PO Qty", minWidth: 100, flex: 1 },
    { field: "si_nmd", headerName: "FOB", minWidth: 100, flex: 1 },
  ];
  return (
    <>
      <CustomAppBar title={"Confirm to Approved"} />
      <CustomTable
        columns={viewColumns}
        rows={[]}
        // loading={isApprovalLoading}
        height={[]?.length > 0 ? "auto" : "270px"}
      />
    </>
  );
};

export default ConfirmToApproval;
