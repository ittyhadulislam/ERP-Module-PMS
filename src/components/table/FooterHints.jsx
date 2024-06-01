import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";

export function CustomFooterStatusComponent({ footerHints }) {
  if (!footerHints) return null;
  return (
    <Box sx={{ p: 1, display: "flex" }}>
      <FiberManualRecordIcon
        fontSize="small"
        sx={{
          mr: 1,
          color: "connected" === "connected" ? "#4caf50" : "#d9182e",
        }}
      />
      Status {"props.status"}
    </Box>
  );
}
