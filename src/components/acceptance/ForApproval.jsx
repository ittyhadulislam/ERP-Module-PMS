import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomTable from "../table/CustomTable";
import {
  useGetAcceptanceForAppQuery,
  useLazyGetAcceptanceForAppEditQuery,
} from "../../redux/features/commercial/acceptance/queryAcceptance";
import { errorToast, successToast } from "../../common/toaster/toaster";
import { useDispatch, useSelector } from "react-redux";
import { formateDate } from "../../utils/formateDate";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { setAcceptance } from "../../redux/features/commercial/acceptance/acceptanceSlice";
import { setEditDataToRedux } from "./setReduxState";
import { useConfirmAcceptanceForAppMutation } from "../../redux/features/commercial/acceptance/mutationAcceptance";

const ForApproval = ({ setGoToTab }) => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  // get for approval data
  const { data, isError, isLoading, refetch } = useGetAcceptanceForAppQuery(
    userName,
    { refetchOnMountOrArgChange: true }
  );
  // get for approval edit data
  const [getData, { data: editData, isSuccess: editSuccess }] =
    useLazyGetAcceptanceForAppEditQuery();
  // confirm for approval
  const [
    confirmAcceptanceForApp,
    { data: confirmData, isSuccess: confirmSuccess, error: confirmError },
  ] = useConfirmAcceptanceForAppMutation();

  // handleClick fn
  const handleClick = (invoiceNo) => {
    confirmAcceptanceForApp({ invNo: invoiceNo, user: userName });
  };

  // set edit data
  useEffect(() => {
    if (editData && editSuccess) {
      dispatch(setAcceptance({ key: "editTableData", value: editData?.data }));
      setEditDataToRedux(dispatch, editData?.dataSingle[0]);
      setGoToTab(0);
    }
  }, [editData, editSuccess]);

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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                variant="outlined"
                size="small"
                color="primary"
                title="EDIT"
                sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
                onClick={() => {
                  getData({ b2b: bblC_Code, invNo: invoiceNo });
                }}
                // title={"Edit"}
                // loading
              >
                <BiEdit size={20} />
              </LoadingButton>
            </Box>
            <span
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => handleClick(invoiceNo)}
            >
              select
            </span>
          </>
        );
      },
      minWidth: 90,
      maxWidth: 90,
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
  //

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
  return (
    <>
      <CustomAppBar title={"For Approval"} />
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        loading={isLoading}
        height={tableData?.length > 0 ? "auto" : "270px"}
      />
    </>
  );
};

export default ForApproval;
