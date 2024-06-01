import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomTable from "../table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { formateDate } from "../../utils/formateDate";
import { useGetAcceptanceApprovedQuery } from "../../redux/features/commercial/acceptance/queryAcceptance";
const Approved = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  // get for approval data
  const { data, isError, error, isLoading, refetch } =
    useGetAcceptanceApprovedQuery(userName, {
      refetchOnMountOrArgChange: true,
    });
  const viewColumns = [
    {
      field: "bblC_No",
      headerName: "BBLC No",
      minWidth: 100,
      flex: 1,
    },
    { field: "invoiceNo", headerName: "Invoice No.", minWidth: 100, flex: 1 },
    {
      field: "accept_Value",
      headerName: "Accepted Value",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "accept_Date",
      headerName: "Accepted Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 150,
      flex: 1,
    },

    {
      field: "maturity_Date",
      headerName: "Maturity Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "paymentMode",
      headerName: "Payment Mode",
      minWidth: 150,
      flex: 1,
    },
    { field: "remarks", headerName: "Remarks", minWidth: 100, flex: 1 },
  ];

  const tableData = data?.data?.map((e, i) => ({ ...e, id: i + 1 }));
  return (
    <>
      <CustomAppBar title={"Approved"} />
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        loading={isLoading}
        height={tableData?.length > 0 ? "auto" : "270px"}
      />
    </>
  );
};

export default Approved;
