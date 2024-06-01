import { LoadingButton } from "@mui/lab";
import React from "react";
import UpdateIcon from "@mui/icons-material/Update";
const UpdateButton = ({
  type = "button",
  handleClick = () => {},
  loading = false,
  title,
}) => {
  return (
    <LoadingButton
      style={{ minWidth: "160px", paddingY: "0.42em", margin: "2px" }}
      //   style={{ cursor: "not-allowed" }}
      //   disabled
      type={type}
      variant="contained"
      color="success"
      size="small"
      onClick={handleClick}
      loading={loading}
      loadingIndicator="Loading..."
    >
      <UpdateIcon sx={{ mr: 1, fontSize: "20px" }} />
      {title}
    </LoadingButton>
  );
};

export default UpdateButton;
