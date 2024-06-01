import { LoadingButton } from "@mui/lab";
import React from "react";
import { MdClear } from "react-icons/md";
const ResetButton = ({
    type = "button",
    handleClick = () => { },
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
            color="warning"
            size="small"
            onClick={handleClick}
            loading={loading}
            loadingIndicator="Loading..."
        >
            <MdClear size={23} sx={{ mr: 1 }} />
            {title}
        </LoadingButton>
    );
};

export default ResetButton;