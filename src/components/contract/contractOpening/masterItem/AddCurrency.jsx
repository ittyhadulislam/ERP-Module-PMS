import React, { useEffect, useState } from "react";
import SubmitButton from "../../../buttons/SubmitButton";
import { Box, Stack } from "@mui/system";
import { Grid } from "@mui/material";
import CustomTextInput from "../../../inputs/CustomTextInput";
import CustomTable from "../../../table/CustomTable";
import {
  useGetAllCurrencyListQuery,
  useSaveCurrencyDataMutation,
} from "../../../../redux/features/commercial/contract/masterSetup";
import { useSelector } from "react-redux";
import { formateDate } from "../../../../utils/formateDate";
import { errorToast, successToast } from "../../../../common/toaster/toaster";

const AddCurrency = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [currencyState, setCurrencyState] = useState(null);

  const { currencyCode, currencyName, exchangeRate } = currencyState || {};
  // get table data
  const { data: tableData, isLoading: tableDataLoading } =
    useGetAllCurrencyListQuery();
  // save bank api
  const [saveCurrencyData, { data, isLoading, isError, isSuccess, error }] =
    useSaveCurrencyDataMutation();

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      cCurID: 0,
      cCurCode: currencyCode,
      cCurdes: currencyName,
      nExgRate: +exchangeRate,
      userName: userName,
    };
    console.log(payload);
    saveCurrencyData(payload);
  };

  // toaster
  useEffect(() => {
    if (data && isSuccess) {
      successToast(data.message);
      setCurrencyState(null);
    }
  }, [data]);
  useEffect(() => {
    if (error && isError) {
      errorToast(error.data.message);
    }
  }, [error]);
  const columns = [
    { field: "cCurCode", headerName: "currency Code", minWidth: 280 },
    {
      field: "cCurdes",
      headerName: "Currency",
      minWidth: 250,
    },
    { field: "nExgRate", headerName: "Rate", minWidth: 200 },
    { field: "cur_Symbol", headerName: "symble", minWidth: 200 },
    { field: "cuser", headerName: "created by", minWidth: 175 },
    {
      field: "cEntDAte",
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
            label={"currency code"}
            name="currencyCode"
            value={currencyCode}
            setLocalState={setCurrencyState}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextInput
            label={"currency name"}
            name="currencyName"
            value={currencyName}
            setLocalState={setCurrencyState}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextInput
            label={"exchange rate"}
            name="exchangeRate"
            type="number"
            value={exchangeRate}
            setLocalState={setCurrencyState}
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
            <SubmitButton title={"Save"} type="submit" loading={isLoading} />
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

export default AddCurrency;
