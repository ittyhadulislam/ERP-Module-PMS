import { CheckCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import React from "react";

const SubmitButton = ({
  type = "button",
  handleClick,
  loading = false,
  disabled = false,
  fullWidth = false,
  title,
}) => {
  return (
    <LoadingButton
      sx={{
        minWidth: fullWidth ? "100%" : "160px",
        paddingY: "0.42em",
        margin: "2px",
      }}
      type={type}
      variant="contained"
      color="success"
      size="small"
      loadingIndicator={"Loading..."}
      loading={loading}
      onClick={handleClick}
      disabled={disabled}
    >
      <CheckCircleOutline sx={{ mr: 1, fontSize: "20px" }}></CheckCircleOutline>{" "}
      {title}
    </LoadingButton>
  );
};

export default SubmitButton;
