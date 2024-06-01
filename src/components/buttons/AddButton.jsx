import { LoadingButton } from "@mui/lab";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import React from "react";

const AddButton = ({
  type = "button",
  handleClick = () => {},
  loading = false,
  fullWidth = false,
  disabled = false,
  title,
}) => {
  return (
    <LoadingButton
      sx={{
        minWidth: fullWidth ? "100%" : "160px",
        paddingY: "0.42em",
        margin: "2px",
      }}
      //   style={{ cursor: "not-allowed" }}
      disabled={disabled}
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

export default AddButton;
