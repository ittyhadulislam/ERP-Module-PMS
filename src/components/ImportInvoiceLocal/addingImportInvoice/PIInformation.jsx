import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";
import { useSelector } from "react-redux";
import { formateDate } from "../../../utils/formateDate";

const PIInformation = () => {
  const { piDetails } = useSelector((state) => state.localInvoice);

  const viewColumns = [
    {
      field: "pI_NO",
      headerName: "PI NO",
      minWidth: 100,
      flex: 1,
    },
    { field: "cSupName", headerName: "Supplier", minWidth: 100, flex: 1 },
    {
      field: "pI_date",
      headerName: "PI Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    { field: "value", headerName: "PI Value", minWidth: 150, flex: 1 },
  ];
  return (
    <>
      <CustomAppBar title={"pi information"} />
      <CustomTable
        columns={viewColumns}
        rows={piDetails ?? []}
        // loading={isApprovalLoading}
        height={piDetails?.length > 0 ? "auto" : "270px"}
      />
    </>
  );
};

export default PIInformation;
