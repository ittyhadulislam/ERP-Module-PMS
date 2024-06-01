import React from "react";
import { Box, Button, Stack } from "@mui/material";
const AddMasterLCItem = ({ setTitle, setOpen }) => {
  const handleClick = (name) => {
    setTitle(name);
    setOpen(true);
  };
  return (
    <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
      <Stack direction={"row"} p={1} spacing={2} justifyContent="space-between">
        <span>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleClick("add-beneficiary")}
            sx={{ m: 0.5 }}
          >
            add Beneficiary
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => handleClick("add-bank")}
            sx={{ m: 0.5 }}
          >
            add Bank
          </Button>
        </span>
      </Stack>
    </Box>
  );
};

export default AddMasterLCItem;
