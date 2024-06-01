import { TextField } from "@mui/material";
import { useEffect } from "react";
import { warningToast } from "../../common/toaster/toaster";
import { useDispatch } from "react-redux";

const CustomTextInput = ({
  register = () => {},
  setValue = () => {},
  setStateValue = () => {},
  setLocalState = () => {},
  onBlur = () => {},
  setReduxState = null,
  validation = {},
  name = "",
  label,
  value = "",
  readOnly = false,
  type = "text",
  multiline = false,
  required = false,
  disabled = false,
  isNumber = false,
  maxLength = 150,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (value) setValue(name, value);
    if (value) setLocalState((prev) => ({ ...prev, [name]: value }));
    if (value && setReduxState)
      dispatch(setReduxState({ key: name, value: value }));
  }, [value]);
  return (
    <div>
      <TextField
        onChange={(e) => {
          setStateValue(e.target.value);
          setLocalState((prev) => ({ ...prev, [name]: e.target.value }));
          setValue(name, e.target.value);
          setReduxState &&
            dispatch(setReduxState({ key: name, value: e.target.value }));
        }}
        fullWidth
        value={value}
        label={label}
        required={required}
        disabled={disabled}
        id="outlined-size-small"
        size="small"
        type={type}
        multiline={multiline}
        maxLength={maxLength}
        onBlur={onBlur}
        onInput={(e) => {
          if (!isNumber) return;
          if (isNaN(parseFloat(e.target.value))) {
            e.target.value = 0;
            return warningToast("Please Enter a Number");
          } else {
            e.target.value = Math.max(0, parseFloat(e.target.value))
              .toString()
              .slice(0, maxLength);
          }
        }}
        // InputProps={{
        //   // readOnly: readOnly,

        // }}
        {...register(name, validation)}
        // InputLabelProps={{ shrink: value }}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "13px", // You can adjust this value as needed
          },
        }}
      />
    </div>
  );
};

export default CustomTextInput;
