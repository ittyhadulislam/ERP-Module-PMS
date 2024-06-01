import React from "react";

import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";
import { useGetCuttingApprovedViewQuery } from "../../../redux/features/cutting/cuttingApproval/queryCuttingApproval";
import { useSelector } from "react-redux";

const CuttingApprovedView = () => {
  const { user } = useSelector((state) => state.auth);

  const { data: approvedData, isLoading } = useGetCuttingApprovedViewQuery(
    user?.companyID
  );
  const approvalColumns = [
    // { field: "cMainCategory", headerName: "Report", flex: 1 },
    {
      field: "cStyleNo",
      headerName: "Style No",
      // minWidth: 100,
      maxWidth: 180,
      flex: 1,
    },
    { field: "nOrderPO", headerName: "PO No", flex: 1 },
    { field: "cLayNo", headerName: "Lay No", maxWidth: 80, flex: 1 },
    { field: "cRealLay", headerName: "Manual Lay", maxWidth: 120, flex: 1 },
    { field: "nCutNo", headerName: "Cut No", maxWidth: 80, flex: 1 },
    { field: "cCmpName", headerName: "Company", flex: 1 },
    {
      field: "proDate",
      headerName: "Cutting Date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 110,
      maxWidth: 110,
      flex: 1,
    },
    { field: "cUserFullname", headerName: "Created By", flex: 1 },
  ];
  const approvedRows = approvedData?.map((row, i) => ({ ...row, id: i }));

  return (
    <>
      <CustomTable
        columns={approvalColumns}
        rows={approvedRows ?? []}
        loading={isLoading}
        height={approvedRows?.length > 0 ? "auto" : "280px"}
        //   isSuccess={isSuccess}
      />
    </>
  );
};

export default CuttingApprovedView;
