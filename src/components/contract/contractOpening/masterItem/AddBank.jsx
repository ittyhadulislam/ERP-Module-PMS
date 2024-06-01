import React, { useEffect, useState } from "react";
import CustomTable from "../../../table/CustomTable";
import { formateDate } from "../../../../utils/formateDate";
import CustomAutocomplete from "../../../inputs/CustomAutocomplete";
import { Box, Grid, Stack } from "@mui/material";
import CustomTextInput from "../../../inputs/CustomTextInput";
import SubmitButton from "../../../buttons/SubmitButton";
import {
  useGetAllBankListQuery,
  useSaveAndEditMutation,
} from "../../../../redux/features/commercial/contract/masterSetup";
import { useSelector } from "react-redux";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../../common/toaster/toaster";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";

const AddBank = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [bankState, setBankState] = useState(null);
  const [editData, setEditData] = useState(null);
  const {
    bankCode,
    bankName,
    bankAddress,
    telephone,
    fax,
    countryCode,
    swiftCode,
    bankShortName,
  } = bankState || {};

  // get table data
  const { data: tableData, isLoading: tableDataLoading } =
    useGetAllBankListQuery();
  // save bank api
  const [saveAndEdit, { data, isLoading, isError, isSuccess, error }] =
    useSaveAndEditMutation();
  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      bank_Code: editData ? bankCode : 0,
      bank_Name: bankName,
      bank_Address: bankAddress,
      telephone_No: telephone,
      fax: fax,
      country_Code: +countryCode,
      swift_Code: swiftCode,
      bankshort_Name: bankShortName,
      userName: userName,
    };
    console.log(payload);
    saveAndEdit(payload);
  };

  // state for editing
  useEffect(() => {
    if (editData) {
      setBankState((prev) => ({ ...prev, bankCode: editData.bank_Code }));
      setBankState((prev) => ({ ...prev, bankName: editData.bank_Name }));
      setBankState((prev) => ({ ...prev, bankAddress: editData.bank_Address }));
      setBankState((prev) => ({ ...prev, telephone: editData.telephone_No }));
      setBankState((prev) => ({ ...prev, fax: editData.fax }));
      setBankState((prev) => ({ ...prev, countryCode: editData.country_Code }));
      setBankState((prev) => ({ ...prev, swiftCode: editData.swift_Code }));
      setBankState((prev) => ({
        ...prev,
        bankShortName: editData.bshortname ?? "",
      }));
    } else {
      setBankState(null);
    }
  }, [editData]);

  // toaster
  useEffect(() => {
    if (data && isSuccess) {
      successToast(data.message);
      setEditData(null);
      setBankState(null);
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
    { field: "bank_Name", headerName: "bank name", minWidth: 280 },
    {
      field: "bank_Address",
      headerName: "bank address",
      minWidth: 250,
    },
    { field: "telephone_No", headerName: "Phone", minWidth: 200 },
    { field: "country_Code", headerName: "country code", minWidth: 200 },
    { field: "created_By", headerName: "created by", minWidth: 175 },
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
        <Grid item xs={4}>
          <CustomTextInput
            label={"bank name"}
            name="bankName"
            value={bankName}
            setLocalState={setBankState}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextInput
            label={"bank address"}
            name="bankAddress"
            value={bankAddress}
            setLocalState={setBankState}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextInput
            label={"telephone"}
            name="telephone"
            value={telephone}
            setLocalState={setBankState}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextInput
            label={"fax"}
            name="fax"
            value={fax}
            setLocalState={setBankState}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextInput
            label={"country code"}
            name="countryCode"
            type="number"
            value={countryCode}
            setLocalState={setBankState}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextInput
            label={"Swift code"}
            name="swiftCode"
            value={swiftCode}
            setLocalState={setBankState}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextInput
            label={"bank short name"}
            name="bankShortName"
            value={bankShortName}
            setLocalState={setBankState}
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
              title={bankCode ? "Update" : "Save"}
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

export default AddBank;
