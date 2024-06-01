import { LoadingButton } from "@mui/lab";
import React from "react";

// type color="inherit" | "info" | "error" | "primary" | "secondary" | "success" | "warning"

const CustomButtonSmall = ({
  title,
  type = "button",
  color = "secondary",
  handleClick = () => {},
  loading = false,
  disabled = false,
  icon = null,
  fullWidth = false,
}) => {
  return (
    <>
      <LoadingButton
        //   style={{
        //     minWidth: "160px",
        //     marginRight: "5px",
        //     marginLeft: "5px",
        //     paddingY: "0.42em",
        //   }}
        //   style={{ cursor: "not-allowed" }}
        //   disabled
        variant="outlined"
        size="small"
        color={color}
        type={type}
        fullWidth={fullWidth}
        onClick={handleClick}
        loading={loading}
        disabled={disabled}
        loadingIndicator="Loading..."
        sx={{ m: 0.2, mt: 0, fontSize: ".6rem", padding: "0.2rem" }}
      >
        {icon}
        {title}
      </LoadingButton>
    </>
  );
};

export default CustomButtonSmall;
