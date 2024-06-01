import { LoadingButton } from "@mui/lab";
import React from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";

const ReportButton = ({
  type = "button",
  handleClick = () => {},
  loading = false,
  disabled = false,
  title,
  fullWidth = false,
}) => {
  return (
    <LoadingButton
      sx={{
        minWidth: fullWidth ? "100%" : "160px",
        paddingY: "0.42em",
        margin: "2px",
      }}
      //   style={{ cursor: "not-allowed" }}
      //   disabled
      type={type}
      variant="contained"
      //   color="success"
      size="small"
      onClick={handleClick}
      loading={loading}
      disabled={disabled}
      loadingIndicator="Loading..."
    >
      {!loading && (
        <BsFileEarmarkPdf
          style={{ marginRight: "5px", fontSize: "18px", color: "red" }}
        />
      )}
      {title}
    </LoadingButton>
  );
};

export default ReportButton;
