import {
  CancelOutlined,
  CheckCircleOutline,
  ResetTvOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const ButtonContainer = () => {
  return (
    <Box sx={{ my: 1, border: "1px dashed grey" }}>
      <Stack direction={"row"} p={1} spacing={2} justifyContent="space-between">
        <span>
          {/* <LoadingButton
            sx={{ mr: 2 }}
            type={"reset"}
            variant="contained"
            color="success"
            size="small"
            loadingIndicator={"Loading..."}
            // loading={}

            // onClick={() => {
            //     document.location.reload(true);
            // }}
          >
            <CheckCircleOutline sx={{ mr: 1 }}></CheckCircleOutline> Approve
          </LoadingButton>
          <Button
            type={"reset"}
            variant="contained"
            color="error"
            size="small"
            // onClick={() => {
            //     document.location.reload(true);
            // }}
          >
            <CancelOutlined sx={{ mr: 1 }}></CancelOutlined> cancel
          </Button> */}
        </span>
        <Button
          style={{ minWidth: "160px" }}
          //   style={{ cursor: "not-allowed" }}
          //   disabled
          type={"reset"}
          variant="contained"
          color="success"
          size="small"
          // onClick={() => {
          //     document.location.reload(true);
          // }}
        >
          {/* <GrAddCircle
            style={{ marginRight: "5px", fontSize: "16px", stroke: "white" }}
          ></GrAddCircle> */}
          {/* import ControlPointIcon from '@mui/icons-material/ControlPoint'; */}
          <ControlPointIcon sx={{ mr: 1, fontSize: "20px" }} />
          Add
        </Button>

        {/* <LoadingButton
                                    type={"submit"}
                                    variant="contained"
                                    color="info"
                                    loading={reportLoading}
                                    loadingIndicator={"Loading..."}
                                    sx={{ marginRight: 3 }}
                                >
                                    View Report
                                </LoadingButton> */}
      </Stack>
    </Box>
  );
};

export default ButtonContainer;
