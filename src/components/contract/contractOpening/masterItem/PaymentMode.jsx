import React, { useEffect, useState } from "react";
import CustomTable from "../../../table/CustomTable";
import { formateDate } from "../../../../utils/formateDate";
import {
  useGetAllPaymentModeQuery,
  useSaveAndEditPaymentModeMutation,
} from "../../../../redux/features/commercial/contract/masterSetup";
import CustomTextInput from "../../../inputs/CustomTextInput";
import { useSelector } from "react-redux";
import { Box, Grid, Stack } from "@mui/material";
import SubmitButton from "../../../buttons/SubmitButton";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { errorToast, successToast } from "../../../../common/toaster/toaster";

const PaymentMode = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [paymentModeState, setPaymentModeState] = useState(null);
  const [editData, setEditData] = useState(null);

  const { paymentMode } = paymentModeState || {};
  //console.log(editData, paymentModeState);
  // get table data
  const { data: tableData, isLoading: tableDataLoading } =
    useGetAllPaymentModeQuery();
  // save bank api
  const [
    saveAndEditPaymentMode,
    { data, isLoading, isError, isSuccess, error },
  ] = useSaveAndEditPaymentModeMutation();

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      paymentModeID: editData ? editData.pM_NO : 0,
      paymentMode: paymentMode,
      userName: userName,
    };
    console.log(payload);
    saveAndEditPaymentMode(payload);
  };

  // state for editing
  useEffect(() => {
    if (editData) {
      setPaymentModeState((prev) => ({
        ...prev,
        paymentMode: editData.payment_Mode,
      }));
    } else {
      setPaymentModeState(null);
    }
  }, [editData]);

  // toaster
  useEffect(() => {
    if (data && isSuccess) {
      successToast(data.message);
      setEditData(null);
      setPaymentModeState(null);
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
    { field: "payment_Mode", headerName: "payment Mode", minWidth: 280 },

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
        <Grid item xs={12}>
          <CustomTextInput
            label={"Payment Mode"}
            name="paymentMode"
            value={paymentMode}
            setLocalState={setPaymentModeState}
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
              // loading={isLoading}
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

export default PaymentMode;
