import { Box, Button, Stack } from "@mui/material";
import React from "react";

const AddMasterLCItem = () => {
  return (
    <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
      <Stack direction={"row"} p={1} spacing={2} justifyContent="space-between">
        <span>
          <Button
            variant="contained"
            size="small"
            //   onClick={() => setSubCatOpen(true)}
            sx={{ mr: 1 }}
            //   disabled={showSubCat}
          >
            add Beneficiary
          </Button>

          <Button
            variant="contained"
            size="small"
            //   onClick={() => setConstruction(true)}
            sx={{ mr: 1 }}
            //   disabled={showConstruction}
          >
            add Bank
          </Button>
        </span>
      </Stack>
    </Box>
  );
};

export default AddMasterLCItem;
