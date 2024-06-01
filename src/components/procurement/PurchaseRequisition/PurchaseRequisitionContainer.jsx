import React from "react";
import PurchaseRequisitionInput from "./PurchaseRequisitionInput";
import PurchaseRequisitionView from "./PurchaseRequisitionView";
import { Box, Stack } from "@mui/system";
import CustomButtonSmall from "../../merchandisingUI/CustomButtonSmall";
import SubmitButtonSmall from "../../merchandisingUI/SubmitButtonSmall";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";

const PurchaseRequisitionContainer = () => {
  return (
    <>
      <PurchaseRequisitionInput />
      <PurchaseRequisitionView />
      <Box mt={1}>
        <CustomTextInputSmall label={"Remarks"} />
      </Box>
      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span style={{ margin: "0px" }}>
            <CustomButtonSmall title={"Sub Category"} />
            <CustomButtonSmall title={"color"} />
            <CustomButtonSmall title={"size"} />
            <CustomButtonSmall title={"article"} />
            <CustomButtonSmall title={"dimension"} />
            <CustomButtonSmall title={"brand"} />
          </span>
          <span style={{ margin: "0px" }}>
            <SubmitButtonSmall title={"save"} />
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default PurchaseRequisitionContainer;
