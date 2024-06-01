import { Box, Stack } from "@mui/system";
import React from "react";
import SubmitButton from "../../buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
const AddButton = ({ isLoading }) => {
  const { editTableData } = useSelector((state) => state.acceptance);
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
            title={editTableData?.length > 0 ? "Update" : "Add"}
            type="submit"
            loading={isLoading}
          />
        </span>
      </Stack>
    </Box>
  );
};

export default AddButton;
