import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { prepareDate } from "../../utils/prepareDate";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { shouldDisableDate } from "../../utils/shouldDisableDate";
import { useDispatch } from "react-redux";

const CustomDatePicker = ({
  label,
  setValue = () => { },
  setData = () => { },
  setLocalState = () => { },
  setReduxState = null,
  name = "",
  value = null,
  required = false,
  disabled = false,
  disablePast = false,
  disableFuture = false,
  prevDate = 999999,
  futureDate = 999999,
}) => {
  const dispatch = useDispatch();

  if (value) {
    setValue(name, dayjs(value).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"));
  }
  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const disableDate = (date) => {
    return shouldDisableDate(date, prevDate, futureDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        inputFormat="DD-MMM-YYYY"
        mask=""
        onChange={(newValue) => {
          // if (newValue) {
          setData(dayjs(newValue).format("DD-MMM-YYYY"));
          setReduxState &&
            dispatch(
              setReduxState({
                key: name,
                value: dayjs(newValue).format("DD-MMM-YYYY"),
              })
            );
          setLocalState((prev) => ({
            ...prev,
            [name]: dayjs(newValue).format("DD-MMM-YYYY"),
          }));
          setValue(name, dayjs(newValue).format("DD-MMM-YYYY"));
          // }
        }}
        value={value}
        label={label}
        disabled={disabled}
        disablePast={disablePast}
        disableFuture={disableFuture}
        shouldDisableDate={disableDate}
        renderInput={(props) => {
          return (
            <TextField
              required={required}
              onKeyDown={onKeyDown}
              {...props}
              sx={{
                width: "100%",
                " & .MuiInputBase-root": {
                  fontSize: "13px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "9px !important",
                },
                "& .MuiInputLabel-root": {
                  top: "-7px !important",
                },
                "& .MuiInputLabel-shrink": {
                  top: "0px !important",
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
