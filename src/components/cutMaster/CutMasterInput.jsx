import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import {
  useGetCompanyInfoQuery,
  useGetYearQuery,
  useLazyGetBuyerQuery,
  useLazyGetGarmentsQuery,
  useLazyGetStyleQuery,
} from "../../redux/features/cutting/cutMaster/queryCutMaster";

import { useSelector } from "react-redux";
import { setCutMaster } from "../../redux/features/cutting/cutMaster/cuttingSlice";

const CutMasterInput = () => {
  const { company, year, buyer, style } = useSelector(
    (state) => state.cutMaster
  );
  const { data: companyData, isLoading: isCompanyLoading } =
    useGetCompanyInfoQuery();

  const { data: yearData, isLoading: isYearLoading } = useGetYearQuery();
  // =================================================================
  const [getBuyer, { data: buyerData, isLoading: isBuyerLoading }] =
    useLazyGetBuyerQuery();
  const [getStyle, { data: styleData, isLoading: isStyleLoading }] =
    useLazyGetStyleQuery();
  const [getGarments, { data: garmentsData }] = useLazyGetGarmentsQuery();

  useEffect(() => {
    if (company && year) {
      getBuyer({
        comID: company?.nCompanyID,
        year: year?.year,
      });
    }
    if (company && buyer) {
      getStyle({
        comID: company?.nCompanyID,
        buyer: buyer?.nBuyer_ID,
      });
    }
    if (buyer && style) {
      getGarments({
        buyer: buyer?.nBuyer_ID,
        style: style?.nStyleID,
      });
    }
  }, [company, year, buyer, style]);

  // =================================================================

  return (
    <>
      <CustomAppBar title={"Cut Number Creating"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Company"}
              options={companyData ?? []}
              value={company}
              name="company"
              optionLabel={"cCmpName"}
              optionId={"nCompanyID"}
              loading={isCompanyLoading}
              // setSelectedValue={setCompany}
              setReduxState={setCutMaster}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Year"}
              options={company ? yearData ?? [] : []}
              value={year}
              name="year"
              optionLabel={"year"}
              optionId={"year"}
              loading={isYearLoading}
              // setSelectedValue={setYear}
              setReduxState={setCutMaster}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Buyer"}
              options={year ? buyerData ?? [] : []}
              value={buyer}
              name="buyer"
              optionLabel={"cBuyer_Name"}
              optionId={"nBuyer_ID"}
              loading={isBuyerLoading}
              // setSelectedValue={setBuyer}
              setReduxState={setCutMaster}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Style"}
              options={buyer ? styleData ?? [] : []}
              value={style}
              name="style"
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              loading={isStyleLoading}
              // setSelectedValue={setStyle}
              setReduxState={setCutMaster}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Garments Type"}
              value={garmentsData && style ? garmentsData[0]?.cGmetDis : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Total Qty (Pcs)"}
              type="number"
              value={garmentsData && style ? garmentsData[0]?.nTotOrdQty : ""}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CutMasterInput;
