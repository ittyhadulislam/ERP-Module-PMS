import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import { useSelector } from "react-redux";
import {
  useGetSmvBuyerQuery,
  useGetSmvStyleInfoForSmvQuery,
  useGetSmvStyleQuery,
} from "../../../redux/features/sewing/smv/querySmv";
import { useSaveSmvMutation } from "../../../redux/features/sewing/smv/mutationSmv";
import { successToast } from "../../../common/toaster/toaster";

const SMVInput = () => {
  const { user } = useSelector((state) => state.auth);
  const [buyer, setBuyer] = useState(null);
  const [style, setStyle] = useState(null);
  const [smv, setSmv] = useState(null);

  //get buyer
  const { data: buyerData, isLoading: isBuyerLoading } = useGetSmvBuyerQuery();

  //get style
  const { data: styleData, isLoading: isStyleLoading } = useGetSmvStyleQuery(
    buyer?.nBuyer_ID
  );
  //set style info for smv
  const { data: styleInfoData } = useGetSmvStyleInfoForSmvQuery({
    buyerId: buyer?.nBuyer_ID,
    styleId: style?.nStyleID,
  });

  //save mutation api
  const [saveSmv, { data: saveData, isSuccess: isSaveSuccess }] =
    useSaveSmvMutation();

  // handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      styleID: style?.nStyleID,
      smv: parseFloat(smv),
      userName: user?.userName,
    };
    saveSmv(payload);
  };
  useEffect(() => {
    isSaveSuccess && successToast(saveData?.message);
    if (isSaveSuccess) {
      setBuyer(null);
      setStyle(null);
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    !buyer && setStyle(null);
  }, [buyer, style]);

  useEffect(() => {
    if (smv?.length > 6) {
      setSmv("");
    }
    // console.log(smv);
  }, [smv]);

  return (
    <form onSubmit={handleSubmit}>
      <CustomAppBar title={"Input SMV"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Buyer"}
              options={buyerData ?? []} //company ? yearData ?? [] :
              value={buyer}
              optionLabel={"cBuyer_Name"}
              optionId={"nBuyer_ID"}
              loading={isBuyerLoading}
              setSelectedValue={setBuyer}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Style"}
              options={styleData ?? []}
              value={style}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              loading={isStyleLoading}
              setSelectedValue={setStyle}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Garments Type"}
              value={style ? styleInfoData && styleInfoData[0]?.cGmetDis : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Total Qty (Pcs)"}
              value={style ? styleInfoData && styleInfoData[0]?.nTotOrdQty : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"SMV"}
              type="number"
              // isNumber={true}
              maxLength={5}
              value={smv}
              setStateValue={setSmv}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 1, mb: 0, border: "1px dashed grey" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span>
            <SubmitButton
              title={"Save"}
              type="submit"
              //   handleClick={handleSave}
              //   loading={isLoading}
              //   disabled={selectedRow.length <= 0 || showApproval}
            />
          </span>
        </Stack>
      </Box>
    </form>
  );
};

export default SMVInput;
