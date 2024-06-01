import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const CustomDateTimePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Basic date time picker"
        onChange={(newValue) => {
          //   setValue(newValue);
        }}
        sx={{
          width: "100%",
          " & .MuiInputBase-root": {
            fontSize: "13px",
            // padding: '9px',
          },
          "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
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

export default CustomDateTimePicker;
