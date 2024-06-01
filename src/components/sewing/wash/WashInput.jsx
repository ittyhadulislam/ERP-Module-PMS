import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import SubmitButton from "../../buttons/SubmitButton";
import CustomTable from "../../table/CustomTable";
import { warningToast } from "../../../common/toaster/toaster";

const WashInput = () => {
  const layRatioColumns = [
    {
      field: "sizeNo",
      headerName: "id",
      accessor: "action",
      minWidth: 45,
      maxWidth: 45,
      flex: 1,
    },

    { field: "orgSize", headerName: "size", maxWidth: 90, flex: 1 },
    { field: "Sewing Quantity", headerName: "Sewing Quantity", flex: 1 },
    { field: "Sent Quantity", headerName: "Sent Quantity", flex: 1 },
    {
      field: "Send Balance Quantity",
      headerName: "Send Balance Quantity",
      flex: 1,
    },
    { field: "Received Quantity", headerName: "Received Quantity", flex: 1 },
    {
      field: "Received Balance Quantity",
      headerName: "Received Balance Quantity",
      flex: 1,
    },
    {
      field: "nCutNum",
      headerName: "Send Quantity",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        const { sizeNo } = row?.row;
        return (
          <input
            type="text"
            maxLength="3"
            onInput={(e) => {
              if (isNaN(parseInt(e.target.value))) {
                e.target.value = 0;
                return warningToast("Please Enter a Number");
              } else {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 3);
              }
            }}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            onChange={(e) =>
              handleTextFieldChange(sizeNo, e.target.value, "ratioValue")
            }
          />
        );
      },
    },
    {
      field: "nCutNum",
      headerName: "Receive Quantity",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        const { sizeNo } = row?.row;
        return (
          <input
            type="text"
            maxLength="3"
            onInput={(e) => {
              if (isNaN(parseInt(e.target.value))) {
                e.target.value = 0;
                return warningToast("Please Enter a Number");
              } else {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 3);
              }
            }}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            onChange={(e) =>
              handleTextFieldChange(sizeNo, e.target.value, "ratioValue")
            }
          />
        );
      },
    },
  ];
  return (
    <>
      <CustomAppBar title={"Input Washing Data"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Company"}
              options={[]} //company ? yearData ?? [] :
              //   value={year}
              //   optionLabel={"nYear"}
              //   optionId={"nYear"}
              //   loading={isYearLoading}
              //   setSelectedValue={setYear}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Style"}
              options={[]}
              //   value={style}
              //   optionLabel={"cStyleNo"}
              //   optionId={"nStyleID"}
              //   loading={isStyleLoading}
              //   setSelectedValue={setStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"PO"}
              options={[]}
              //   value={style}
              //   optionLabel={"cStyleNo"}
              //   optionId={"nStyleID"}
              //   loading={isStyleLoading}
              //   setSelectedValue={setStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Country"}
              options={[]}
              //   value={style}
              //   optionLabel={"cStyleNo"}
              //   optionId={"nStyleID"}
              //   loading={isStyleLoading}
              //   setSelectedValue={setStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Color"}
              options={[]}
              //   value={style}
              //   optionLabel={"cStyleNo"}
              //   optionId={"nStyleID"}
              //   loading={isStyleLoading}
              //   setSelectedValue={setStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Floor"}
              options={[]}
              //   value={style}
              //   optionLabel={"cStyleNo"}
              //   optionId={"nStyleID"}
              //   loading={isStyleLoading}
              //   setSelectedValue={setStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomDatePicker
              label={"Date"}
              name={"date"}
              // disableFuture={true}
              //   prevDate={2}
              //   futureDate={2}
              //   value={date}
              //   setData={setData}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Hour"}
              isNumber={true}
              maxLength={2}
              //   type="number"
              //   value={bundleQty}
              //   setStateValue={setBundleQty}
              required={true}
              //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Line"}
              options={[]}
              //   value={style}
              //   optionLabel={"cStyleNo"}
              //   optionId={"nStyleID"}
              //   loading={isStyleLoading}
              //   setSelectedValue={setStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Send/Received Status"}
              options={[]}
              //   value={style}
              //   optionLabel={"cStyleNo"}
              //   optionId={"nStyleID"}
              //   loading={isStyleLoading}
              //   setSelectedValue={setStyle}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 1, border: "1px dashed grey" }}>
        <CustomAppBar title={"Size Info"} />
        <CustomTable
          columns={layRatioColumns}
          rows={[]}
          //   loading={isLayRatioLoading}
          toolBar={false}
          search={true}
          hideFooter={true}
          pagePerSize={99}
        />
      </Box>
    </>
  );
};

export default WashInput;
