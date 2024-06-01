import React, { useEffect, useState } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomTextInput from "../inputs/CustomTextInput";
import ErrorButton from "../buttons/ErrorButton";
import { errorToast, successToast } from "../../common/toaster/toaster";
import { useCancelGatePassBtnMutation } from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassMutation";
import { useSelector } from "react-redux";

const CancelGatePass = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [gatePassNo, setGatePassNo] = useState("");
  // cancel mutation
  const [cancelGatePassBtn, { data, isSuccess, isLoading, isError, error }] =
    useCancelGatePassBtnMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    cancelGatePassBtn({
      gpNo: parseInt(gatePassNo),
      createname: userName,
    });
  };

  // toaster setup
  useEffect(() => {
    isError && errorToast("Something went wrong!");
  }, [error]);
  useEffect(() => {
    isSuccess && successToast("Cancel Successfully! ");
    isSuccess && setGatePassNo("");
  }, [data]);
  return (
    <form onSubmit={handleSubmit}>
      <CustomAppBar title={"Input parameters"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"1px"}>
          <Grid item xs={12} sm={7} md={7}>
            <CustomTextInput
              label={"Gate Pass No"}
              value={gatePassNo}
              type="number"
              setStateValue={setGatePassNo}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <ErrorButton
              fullWidth
              type="submit"
              title={"cancel"}
              handleClick={() => {}}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default CancelGatePass;
