import { Box, Stack } from "@mui/system";
import React from "react";
import SubmitButton from "../../buttons/SubmitButton";

const AddButton = () => {
  return (
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
            title={"Add"}
            type="submit"
            // handleClick={}
            //   loading={isSaveLoading}
            //   disabled={selectedRow.length <= 0 || showApproval}
          />
        </span>
      </Stack>
    </Box>
  );
};

export default AddButton;
