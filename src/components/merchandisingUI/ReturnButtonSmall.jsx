import { LoadingButton } from "@mui/lab";
import React from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { ResetTvOutlined } from "@mui/icons-material";
const ReturnButtonSmall = ({
  type = "button",
  handleClick = () => {},
  fullWidth = false,
  loading = false,
  disabled = false,
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

export default ReturnButtonSmall;
