import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import { Box, TextField } from "@mui/material";

const CustomDateRange = () => {
  const cl = document.getElementsByClassName(
    "css-e47596-MuiDateRangeCalendar-root"
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        localeText={{ start: "Check-in", end: "Check-out" }}
        onChange={(newValue) => {
          //   setValue(newValue);
        }}
        sx={{
          width: "100%",
          " & .MuiInputBase-root": {
            fontSize: "13px",
            // padding: '9px',
          },
          "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
            padding: "9px !important",
          },
          "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
            top: "-7px !important",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDateRange;
