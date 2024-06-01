import React, { useState } from "react";
import GeneralInfoInput from "./GeneralInfoInput";
import CompositionInput from "./CompositionInput";
import DyedInput from "./DyedInput";
import PrintInput from "./PrintInput";
import { Box, Stack } from "@mui/system";
import SubmitButton from "../buttons/SubmitButton";
import { initialState } from ".";

const FtdInput = () => {
  const [localState, setLocalState] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <GeneralInfoInput localState={localState} setLocalState={setLocalState} />
      <CompositionInput localState={localState} setLocalState={setLocalState} />
      <DyedInput localState={localState} setLocalState={setLocalState} />
      <PrintInput localState={localState} setLocalState={setLocalState} />
      <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span>
            <SubmitButton title={"Submit"} type="submit" />
          </span>
        </Stack>
      </Box>
    </form>
  );
};

export default FtdInput;
