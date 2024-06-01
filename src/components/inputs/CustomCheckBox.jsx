import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect } from "react";

const CustomCheckBox = ({
  required = false,
  disabled = false,
  label = "",
  checked = false,
  defaultChecked = false,
  handleChange = () => {},
  name,
  setValue,
}) => {
  useEffect(() => {
    setValue(name, checked);
  }, [checked]);
  return (
    <FormControlLabel
      required={required}
      disabled={disabled}
      onChange={(e) => {
        // setStateValue(e.target.value);
        setValue(name, e.target.checked);
      }}
      control={
        <Checkbox
          color="success"
          checked={checked}
          defaultChecked={defaultChecked}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckBox;
