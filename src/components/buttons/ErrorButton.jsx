import { LoadingButton } from "@mui/lab";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const ErrorButton = ({
  type = "button",
  handleClick = () => {},
  loading = false,
  fullWidth = false,
  disabled = false,
  style = {},
  title,
}) => {
  return (
    <LoadingButton
      // style={{ minWidth: "160px", marginRight: "5px" }}
      sx={{
        minWidth: fullWidth ? "100%" : "160px",
        margin: "2px",
        paddingY: "0.42em",
      }}
      style={style}
      disabled={disabled}
      type={type}
      variant="contained"
      color="error"
      size="small"
      onClick={handleClick}
      loading={loading}
      loadingIndicator="Loading..."
    >
      <CloseIcon sx={{ mr: 1, fontSize: "20px" }} />
      {title}
    </LoadingButton>
  );
};

export default ErrorButton;
