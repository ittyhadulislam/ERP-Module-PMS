import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomTable from "../table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useGetAcceptanceConAppQuery } from "../../redux/features/commercial/acceptance/queryAcceptance";
import { formateDate } from "../../utils/formateDate";
import {
  useApproveAcceptanceForAppMutation,
  useReviseAcceptanceForAppMutation,
} from "../../redux/features/commercial/acceptance/mutationAcceptance";
import { errorToast, successToast } from "../../common/toaster/toaster";
const ConfirmToApproval = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  // get for approval data
  const { data, isLoading, isError, refetch } = useGetAcceptanceConAppQuery(
    userName,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // confirm for approval
  const [
    approveAcceptanceForApp,
    { data: confirmData, isSuccess: confirmSuccess, error: confirmError },
  ] = useApproveAcceptanceForAppMutation();
  // revise for approval
  const [
    reviseAcceptanceForApp,
    { data: reviseData, isSuccess: reviseSuccess, error: reviseError },
  ] = useReviseAcceptanceForAppMutation();

  // handleClick fn
  const handleClick = (invoiceNo) => {
    approveAcceptanceForApp({ invNo: invoiceNo, user: userName });
  };
  // handle revise fn
  const handleRevise = (invoiceNo) => {
    reviseAcceptanceForApp({ invNo: invoiceNo, user: userName });
  };

  const viewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        const { invoiceNo, bblC_Code } = row?.row;
        return (
          <>
            <span
              style={{ cursor: "pointer", color: "blue", marginRight: "10px" }}
              onClick={() => handleRevise(invoiceNo)}
            >
              Revise
            </span>
            <span
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => handleClick(invoiceNo)}
            >
              Select
            </span>
          </>
        );
      },
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
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

  const tableData = isError
    ? []
    : data?.data?.map((e, i) => ({ ...e, id: i + 1 }));

  // toaster
  useEffect(() => {
    if (confirmData && confirmSuccess) {
      successToast(confirmData?.message);
      refetch();
    }
  }, [confirmData, confirmSuccess]);
  useEffect(() => {
    if (confirmError) {
      errorToast(confirmError?.data?.message);
    }
  }, [confirmError]);
  useEffect(() => {
    if (reviseData && reviseSuccess) {
      successToast(reviseData?.message);
      refetch();
    }
  }, [reviseData, reviseSuccess]);
  useEffect(() => {
    if (reviseError) {
      errorToast(reviseError?.data?.message);
    }
  }, [reviseError]);
  return (
    <>
      <CustomAppBar title={"Confirm to Approved"} />
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        loading={isLoading}
        height={tableData?.length > 0 ? "auto" : "270px"}
      />
    </>
  );
};

export default ConfirmToApproval;
