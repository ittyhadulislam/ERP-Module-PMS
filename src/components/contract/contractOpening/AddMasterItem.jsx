import React from "react";
import { Box, Button, Stack } from "@mui/material";
const AddMasterItem = ({ setTitle, setOpen }) => {
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
            onClick={() => handleClick("add-bank")}
            sx={{ mr: 1, mb: 1 }}
          >
            add Bank
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => handleClick("add-currency")}
            sx={{ mr: 1, mb: 1 }}
          >
            add currency
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleClick("payment-term")}
            sx={{ mr: 1, mb: 1 }}
          >
            payment term
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleClick("payment-mode")}
            sx={{ mr: 1, mb: 1 }}
          >
            payment mode
          </Button>
        </span>
      </Stack>
    </Box>
  );
};

export default AddMasterItem;
