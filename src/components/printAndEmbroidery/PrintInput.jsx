import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import {
  useGetPrintAndEmbroideryColorQuery,
  useGetPrintAndEmbroideryCountryQuery,
  useGetPrintAndEmbroideryFloorQuery,
  useGetPrintAndEmbroideryLineQuery,
  useGetPrintAndEmbroideryPoQuery,
  useGetPrintAndEmbroiderySendReceiveQuery,
  useGetPrintAndEmbroideryStageQuery,
  useGetPrintAndEmbroideryStyleQuery,
} from "../../redux/features/cutting/printAndEmbroidery/queryPrintAndEmbroidery";
import { useSelector } from "react-redux";

const PrintInput = ({ localState, setLocalState }) => {
  const { user } = useSelector((state) => state.auth);
  const { style, po, country, color, floor, date, line, stage, sendReceive } =
    localState;

  // Get PrintAndEmbroidery Style Query
  const { data: styleData, isLoading: isStyleLoading } =
    useGetPrintAndEmbroideryStyleQuery(user?.companyID);
  // Get PrintAndEmbroidery Po Query
  const { data: poData, isLoading: isPoLoading } =
    useGetPrintAndEmbroideryPoQuery({
      id: user.companyID,
      style: style?.nStyleID,
    });
  // Get PrintAndEmbroidery Country Query
  const { data: countryData, isLoading: isCountryLoading } =
    useGetPrintAndEmbroideryCountryQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
    });
  // Get PrintAndEmbroidery Color Query
  const { data: colorData, isLoading: isColorLoading } =
    useGetPrintAndEmbroideryColorQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
    });
  // Get PrintAndEmbroidery Floor Query
  const { data: floorData, isLoading: isFloorLoading } =
    useGetPrintAndEmbroideryFloorQuery(user?.companyID);
  // Get PrintAndEmbroidery Line Query
  const { data: lineData, isLoading: isLineLoading } =
    useGetPrintAndEmbroideryLineQuery({
      id: user?.companyID,
      floor: floor?.nFloor,
    });
  // Get PrintAndEmbroidery Stage Query
  const { data: stageData, isLoading: isStageLoading } =
    useGetPrintAndEmbroideryStageQuery();
  // Get PrintAndEmbroidery SendReceive Query
  const { data: sendReceiveData, isLoading: isSendReceiveLoading } =
    useGetPrintAndEmbroiderySendReceiveQuery();

  return (
    <>
      <CustomAppBar title={"INPUT PRINT AND EMB-DATA"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Style"}
              name="style"
              options={styleData ?? []}
              value={style}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"PO No"}
              name="po"
              options={style ? poData ?? [] : []}
              value={po}
              optionLabel={"cPoNum"}
              optionId={"cPoNum"}
              loading={isPoLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Country"}
              name="country"
              options={po ? countryData ?? [] : []}
              value={country}
              optionLabel={"cConDes"}
              optionId={"nConCode"}
              loading={isCountryLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Color"}
              name="color"
              options={po ? colorData ?? [] : []}
              value={color}
              optionLabel={"cColour"}
              optionId={"nColNo"}
              loading={isColorLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Floor"}
              name="floor"
              options={floorData ?? []}
              value={floor}
              optionLabel={"cFloor_Descriptin"}
              optionId={"nFloor"}
              loading={isFloorLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomDatePicker
              label={"Date"}
              name="date"
              value={date}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Line"}
              name="line"
              options={floor ? lineData ?? [] : []}
              value={line}
              optionLabel={"line_No"}
              optionId={"line_Code"}
              loading={isLineLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Stage"}
              name="stage"
              options={stageData ?? []}
              value={stage}
              optionLabel={"st_des"}
              optionId={"st_id"}
              loading={isStageLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Send/Received Status"}
              name="sendReceive"
              options={sendReceiveData ?? []}
              value={sendReceive}
              optionLabel={"sr_status"}
              optionId={"sr_id"}
              loading={isSendReceiveLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PrintInput;
