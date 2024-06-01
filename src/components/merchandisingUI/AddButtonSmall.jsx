import { LoadingButton } from "@mui/lab";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import React from "react";

const AddButtonSmall = ({
  type = "button",
  handleClick = () => {},
  loading = false,
  fullWidth = false,
  title,
}) => {
  return (
    <LoadingButton
      sx={{
        m: 0.2,
        mt: 0,
        minWidth: fullWidth ? "100%" : "160px",
        fontSize: ".6rem",
        padding: "0.2rem",
      }}
      type={type}
      variant="contained"
      color="success"
      size="small"
      onClick={handleClick}
      loading={loading}
      loadingIndicator="Loading..."
    >
      <ControlPointIcon sx={{ mr: 1, fontSize: "20px" }} />
      {title}
    </LoadingButton>
  );
};

export default AddButtonSmall;
