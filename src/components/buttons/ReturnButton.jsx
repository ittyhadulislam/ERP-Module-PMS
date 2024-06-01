import { LoadingButton } from "@mui/lab";
import React from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { ResetTvOutlined } from "@mui/icons-material";
const ReturnButton = ({
  type = "button",
  handleClick = () => {},
  fullWidth = false,
  loading = false,
  disabled = false,
  title,
}) => {
  return (
    <LoadingButton
      style={{
        minWidth: fullWidth ? "100%" : "160px",
        margin: "2px",
        paddingY: "0.42em",
      }}
      //   style={{ cursor: "not-allowed" }}
      //   disabled
      type={type}
      variant="contained"
      color="warning"
      size="small"
      onClick={handleClick}
      loading={loading}
      disabled={disabled}
      loadingIndicator="Loading..."
    >
      <ResetTvOutlined sx={{ mr: 1, fontSize: "20px" }} />
      {title}
    </LoadingButton>
  );
};

export default ReturnButton;
