import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextInput from "../inputs/CustomTextInput";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomAppBar from "../common/CustomAppBar";
import {
  useGetExportDataQuery,
  useGetExportMgtQtyQuery,
  useGetExportUnitQuery,
} from "../../redux/features/export/exportChallan/queryExportChallan";

const SizeInfo = ({ localState = {}, setLocalState, saveSuccess }) => {
  // Destructuring Local State
  const {
    color,
    exportQty,
    plusShipmentQty,
    gmtQty,
    gmtUnit,
    totalExportQty,
    totalPacketQty,
  } = localState;
  // Get Export Mgt Qty Query
  const { data: gmtData, isLoading: gmtLoading } = useGetExportMgtQtyQuery();

  // Get Export unit Query
  const { data: unitData, isLoading: unitLoading } = useGetExportUnitQuery();
  // Get Export Data Query
  const {
    data: exportData,
    isLoading: exportLoading,
    refetch,
  } = useGetExportDataQuery(
    {
      style: localState?.style?.nStyleID,
      po: localState?.poNo?.pO_No,
      country: localState?.productionCountry?.nConCode,
      color: localState?.color?.nColNo,
    },
    { refetchOnMountOrArgChange: true }
  );
  const totalGMTQtyCal = isNaN(localState.gmtUnit?.exp_uid * localState.gmtQty)
    ? 0
    : localState.gmtUnit?.exp_uid * localState.gmtQty;

  useEffect(() => {
    setLocalState((prev) => ({
      ...prev,
      totalExportQty:
        exportData && exportData[0]?.expQty !== null
          ? exportData[0]?.expQty
          : "0",
    }));
  }, [exportData && exportData[0]?.expQty]);
  useEffect(() => {
    if (saveSuccess) {
      refetch();
    }
    if (color) {
      refetch();
      // setLocalState()
      setLocalState((prev) => ({ ...prev, gmtQty: 0 }));
      setLocalState((prev) => ({ ...prev, exportQty: "" }));
      setLocalState((prev) => ({ ...prev, plusShipmentQty: 0 }));
    }
  }, [saveSuccess, color]);
  return (
    <>
      <Box sx={{ mt: 1 }}></Box>
      <CustomAppBar title={"SIZE INFO"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4} md={2.4}>
            <CustomTextInput
              label={"Total Order Qty"}
              // isNumber={true}
              // maxLength={6}
              disabled
              name="totalOrderQty"
              setLocalState={setLocalState}
              value={color ? exportData && exportData[0]?.ordQty : ""}
              //   setStateValue={setFinishingQty}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <CustomAutocomplete
              label={"GMT Unit"}
              optionLabel={"exp_desc"}
              optionId={"exp_uid"}
              name="gmtUnit"
              setLocalState={setLocalState}
              options={color ? gmtData ?? [] : []}
              value={gmtUnit}
              loading={gmtLoading}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2.4}>
            <CustomTextInput
              label={"GMT Qty"}
              name="gmtQty"
              isNumber={true}
              maxLength={6}
              setLocalState={setLocalState}
              value={color ? gmtQty : ""}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <CustomTextInput
              label={"Conversion"}
              name="conversion"
              disabled
              setLocalState={setLocalState}
              value={color ? gmtUnit?.exp_uid : ""}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <CustomTextInput
              label={"Total GMT Qty"}
              name="totalGMTQty"
              disabled
              setLocalState={setLocalState}
              value={color ? totalGMTQtyCal : ""}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <CustomTextInput
              label={"Export Qty"}
              name="exportQty"
              isNumber={true}
              maxLength={6}
              setLocalState={setLocalState}
              value={color ? exportQty : ""}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <CustomTextInput
              label={"Plus Shipment Qty"}
              name="plusShipmentQty"
              isNumber={true}
              maxLength={6}
              setLocalState={setLocalState}
              value={color ? plusShipmentQty : ""}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <CustomAutocomplete
              label={"Export Unit"}
              optionLabel={"ex_unit_nm"}
              optionId={"ex_uid"}
              name="exportUnit"
              setLocalState={setLocalState}
              options={color ? unitData ?? [] : []}
              value={localState.exportUnit}
              loading={unitLoading}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={1.2}>
            <CustomTextInput
              label={"Total Pack Qty"}
              name="totalPacketQty"
              isNumber={true}
              // maxLength={6}
              disabled
              setLocalState={setLocalState}
              value={
                color
                  ? exportData && exportData[0]?.packQty !== null
                    ? exportData[0]?.packQty
                    : "0"
                  : ""
              }
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={1.2}>
            <CustomTextInput
              label={"Total Export Qty"}
              name="totalExportQty"
              isNumber={true}
              // maxLength={6}
              disabled
              setLocalState={setLocalState}
              value={
                color
                  ? exportData && exportData[0]?.expQty !== null
                    ? exportData[0]?.expQty
                    : "0"
                  : ""
              }
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <CustomTextInput
              label={"Total Balance Qty"}
              name="totalBalanceQty"
              disabled
              isNumber={true}
              // maxLength={6}
              setLocalState={setLocalState}
              value={color ? totalPacketQty - totalExportQty : ""}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SizeInfo;
