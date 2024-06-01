import { LoadingButton } from "@mui/lab";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const ErrorButtonSmall = ({
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
      sx={{
        m: 0.2,
        mt: 0,
        minWidth: fullWidth ? "100%" : "160px",
        fontSize: ".6rem",
        padding: "0.2rem",
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

export default ErrorButtonSmall;
