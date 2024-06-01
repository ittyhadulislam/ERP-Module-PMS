import { LoadingButton } from "@mui/lab";
import React from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";

const ReportButtonSmall = ({
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
        m: 0.2,
        mt: 0,
        minWidth: fullWidth ? "100%" : "160px",
        fontSize: ".6rem",
        padding: "0.2rem",
      }}
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

export default ReportButtonSmall;
