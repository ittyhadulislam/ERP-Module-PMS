import React, { useEffect } from "react";
import AddButton from "./AddButton";
import NewAcceptanceInput from "./NewAcceptanceInput";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteAcceptanceMutation,
  useSaveAcceptanceMutation,
} from "../../../redux/features/commercial/acceptance/mutationAcceptance";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { resetAcceptanceAll } from "../../../redux/features/commercial/acceptance/acceptanceSlice";
import CustomTable from "../../table/CustomTable";
import { MdOutlineDelete } from "react-icons/md";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { formateDate } from "../../../utils/formateDate";

const NewAcceptanceContainer = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const {
    b2bLc,
    invoiceNo,
    masterLc,
    paymentTerm,
    modeOfLC,
    acceptedDate,
    maturityDate,
    ref,
    remarks,
    exchangeRate,
    acceptedAmount,
    submissionDate,
    invoiceValue,
    //
    editTableData,
  } = useSelector((state) => state.acceptance);

  // save acceptance
  const [
    saveAcceptance,
    { data: saveData, error: saveError, isLoading, isSuccess: saveSuccess },
  ] = useSaveAcceptanceMutation();

  // delete acceptance
  const [
    deleteAcceptance,
    {
      data: deleteData,
      isSuccess: deleteSuccess,
      isLoading: deleteLoading,
      error: deleteError,
    },
  ] = useDeleteAcceptanceMutation();

  // handle submit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      bblcode: b2bLc?.bblC_Code,
      bblcName: b2bLc?.b2BLC_No,
      invoice: invoiceNo?.imP_InvoiceNo,
      invoiceVal: +invoiceValue,
      subdt: submissionDate,
      accptdt: acceptedDate,
      accptValue: +acceptedAmount,
      exRate: +exchangeRate,
      maturitydt: maturityDate,
      paymode: paymentTerm?.payment_ID,
      mlId: masterLc?.masterLCCode,
      userName: userName,
      modelOfLc: modeOfLC?.text,
      refNo: ref,
      remakes: remarks,
    };
    saveAcceptance(payload);
  };

  // handleDelete fn
  const handleDelete = (row) => {
    console.log({
      mlc: row?.macterLCCode,
      b2b: row?.bblC_Code,
      invNo: row?.invoiceNo,
    });
    deleteAcceptance({
      mlc: row?.macterLCCode,
      b2b: row?.bblC_Code,
      invNo: row?.invoiceNo,
    });
  };

  // toaster
  useEffect(() => {
    if (saveData && saveSuccess) {
      successToast(saveData?.message);
      dispatch(resetAcceptanceAll());
    }
  }, [saveData, saveSuccess]);
  useEffect(() => {
    if (saveError) {
      errorToast(saveError?.data?.message);
    }
  }, [saveError]);
  //
  useEffect(() => {
    if (deleteData && deleteSuccess) {
      successToast(deleteData?.message);
      dispatch(resetAcceptanceAll());
    }
  }, [deleteData, deleteSuccess]);
  useEffect(() => {
    if (deleteError) {
      errorToast(deleteError?.data?.message);
    }
  }, [deleteError]);

  //
  const viewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              variant="outlined"
              size="small"
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => handleDelete(row?.row)}
              loading={deleteLoading}
            >
              <MdOutlineDelete size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 70,
      maxWidth: 70,
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
      field: "cContractNo",
      headerName: "Contract No.",
      minWidth: 100,
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
      field: "accept_Value",
      headerName: "Accepted Value",
      minWidth: 150,
      flex: 1,
    },
    { field: "exRate", headerName: "Ex. Rate", minWidth: 100, flex: 1 },
    {
      field: "maturity_Date",
      headerName: "Maturity Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      flex: 1,
    },
    { field: "aType", headerName: "Mode of LC", minWidth: 100, flex: 1 },
    { field: "aType_ref", headerName: "Ref #", minWidth: 100, flex: 1 },
  ];

  const tableData =
    saveData?.data?.map((e, i) => ({ ...e, id: i + 1 })) ||
    editTableData?.map((e, i) => ({ ...e, id: i + 1 }));
  return (
    <form onSubmit={handleSubmit}>
      <NewAcceptanceInput />
      <AddButton isLoading={isLoading} />
      <Box mt={0.5} />
      <CustomTable
        columns={viewColumns}
        rows={invoiceNo ? tableData ?? [] : []}
        loading={isLoading}
        height={tableData?.length > 0 && invoiceNo ? "auto" : "270px"}
      />
    </form>
  );
};

export default NewAcceptanceContainer;
