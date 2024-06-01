import { CheckCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import React from "react";

const SubmitButtonSmall = ({
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

export default SubmitButtonSmall;
