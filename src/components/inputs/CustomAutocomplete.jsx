/* eslint-disable react/prop-types */
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CustomAutocomplete = ({
  options = [],
  loading = false,
  label,
  setSelectedValue = () => { },
  handleChange = () => { },
  optionLabel,
  optionId,
  setValue = () => { },
  setLocalState = () => { },
  setReduxState = null,
  value = "",
  name = "",
  required = false,
  disabled = false,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!value) {
      setSelectedValue(null);
      setLocalState((prev) => ({ ...prev, [name]: null }));
      setReduxState && dispatch(setReduxState({ key: name, value: null }));
    }
    if (value) {
      setValue(optionId, value[optionId]);
      setLocalState((prev) => ({ ...prev, [name]: value }));
      setReduxState && dispatch(setReduxState({ key: name, value }));
    }
  }, [value]);

  const isExist = options?.find(
    (opt) => value && opt[optionId] === value[optionId]
  );
  useEffect(() => {
    if (!isExist) {
      value = null;
      setSelectedValue(null);
      setLocalState((prev) => ({ ...prev, [name]: null }));
      setReduxState && dispatch(setReduxState({ key: name, value: null }));
    }
  }, [isExist]);

  return (
    <>
      <Autocomplete
        id="tags-outlined-drop"
        size="small"
        options={options}
        filterOptions={createFilterOptions({
          matchFrom: "start",
          stringify: (option) => option[optionLabel]?.toString(),
        })}
        disabled={disabled}
        getOptionLabel={(option) => option[optionLabel]?.toString()}
        onChange={(e, newValue) => {
          if (newValue) {
            setSelectedValue(newValue);
            setValue(optionId, newValue[optionId]?.toString());
            setLocalState((prev) => ({ ...prev, [name]: newValue }));
            setReduxState &&
              dispatch(setReduxState({ key: name, value: newValue }));
          } else {
            setLocalState((prev) => ({ ...prev, [name]: null }));
            setReduxState &&
              dispatch(setReduxState({ key: name, value: null }));
            setSelectedValue(null);
          }
        }}
        // getoptionselected={(option, value) =>
        //   option.optionId === value.optionId
        // }
        isOptionEqualToValue={(option, value) =>
          option[optionId] === value[optionId]
        }
        value={value}
        loading={loading}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            label={label}
            required={required}
            InputLabelProps={{
              sx: { fontWeight: 600, fontSize: "14px" },
            }}
            placeholder="search"
            onChange={handleChange}
            sx={{
              fontSize: "13px",
              "& .MuiInputBase-root": {
                fontSize: "13px", // You can adjust this value as needed
              },
            }}
          />
        )}
        renderOption={(props, option, { selected }) => {
          let show = false;
          if (
            optionId !== null &&
            optionId !== undefined &&
            value !== undefined &&
            value !== null
          ) {
            show = option[optionId] === value[optionId];
          }
          return (
            <li
              {...props}
              key={option[optionId]}
              style={{
                backgroundColor: selected || show ? "lightGreen" : "inherit",
                transition: "background-color 0.1s",
                fontSize: "13px",
                borderRadius: "3px",
              }}
              onMouseEnter={(e) => {
                // Change background color on hover
                if (!selected && !show) {
                  e.target.style.backgroundColor = "#ccc"; // Adjust the color as needed
                }
              }}
              onMouseLeave={(e) => {
                // Restore original background color on mouse leave
                if (!selected && !show) {
                  e.target.style.backgroundColor = "inherit";
                }
              }}
            >
              {option[optionLabel]}
            </li>
          );
        }}
      />
    </>
  );
};

export default CustomAutocomplete;
