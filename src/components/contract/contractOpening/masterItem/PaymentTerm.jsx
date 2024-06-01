import React, { useEffect, useState } from "react";
import CustomTextInput from "../../../inputs/CustomTextInput";
import { Box, Grid, Stack } from "@mui/material";
import SubmitButton from "../../../buttons/SubmitButton";
import CustomTable from "../../../table/CustomTable";
import { formateDate } from "../../../../utils/formateDate";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { errorToast, successToast } from "../../../../common/toaster/toaster";
import {
  useGetAllPaymentTermQuery,
  useSaveAndEditPaymentTermMutation,
} from "../../../../redux/features/commercial/contract/masterSetup";
import { useSelector } from "react-redux";

const PaymentTerm = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [paymentTermState, setPaymentTermState] = useState(null);
  const [editData, setEditData] = useState(null);
  console.log(editData);
  const { paymentTerm, payDay } = paymentTermState || {};
  //console.log(editData, paymentModeState);
  // get table data
  const { data: tableData, isLoading: tableDataLoading } =
    useGetAllPaymentTermQuery();
  // save bank api
  const [
    saveAndEditPaymentTerm,
    { data, isLoading, isError, isSuccess, error },
  ] = useSaveAndEditPaymentTermMutation();

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      paymentTermID: editData ? editData.pT_NO : 0,
      paymentTerm: paymentTerm,
      payDays: +payDay,
      userName: userName,
    };
    console.log(payload);
    saveAndEditPaymentTerm(payload);
  };

  // state for editing
  useEffect(() => {
    if (editData) {
      setPaymentTermState((prev) => ({
        ...prev,
        paymentTerm: editData.payment_Term,
      }));
      setPaymentTermState((prev) => ({
        ...prev,
        payDay: editData.payDays,
      }));
    } else {
      setPaymentTermState(null);
    }
  }, [editData]);

  // toaster
  useEffect(() => {
    if (data && isSuccess) {
      successToast(data.message);
      setEditData(null);
      setPaymentTermState(null);
    }
  }, [data]);
  useEffect(() => {
    if (error && isError) {
      errorToast(error.data.message);
    }
  }, [error]);

  const columns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box>
            <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => {
                setEditData(row?.row);
              }}
            >
              <BiEdit size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 50,
      maxWidth: 55,
    },
    { field: "payment_Term", headerName: "payment Term", minWidth: 280 },
    { field: "payDays", headerName: "pay days", minWidth: 280 },

    { field: "created_User", headerName: "created by", minWidth: 175 },
    {
      field: "created_Date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),

      //   minWidth: 120,
      minWidth: 175,
    },
  ];

  const rows = tableData?.listData?.map((e, i) => ({ ...e, id: i + 1 }));
  return (
    <form onSubmit={handleSave}>
      <Grid container spacing={1} my={1}>
        <Grid item xs={6}>
          <CustomTextInput
            label={"Payment Term"}
            name="paymentTerm"
            value={paymentTerm}
            setLocalState={setPaymentTermState}
            required={true}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            label={"Pay Days"}
            name="payDay"
            type="number"
            value={payDay}
            setLocalState={setPaymentTermState}
            required={true}
          />
        </Grid>
      </Grid>

      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={1}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>
          <span>
            <SubmitButton
              title={editData ? "Update" : "Save"}
              type="submit"
              loading={isLoading}
            />
          </span>
        </Stack>
      </Box>
      <CustomTable
        columns={columns}
        rows={rows ?? []}
        loading={tableDataLoading}
      />
    </form>
  );
};

export default PaymentTerm;
