/* eslint-disable react/prop-types */
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";

export default function SelectReport({
  title,
  setTitle = () => { },
  setReduxState = null,
  options,
  id,
}) {
  const dispatch = useDispatch();
  return (
    <FormControl sx={{ minWidth: "100%", pl: "10px" }}>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
        <Grid container>
          {options?.map((option, index) => (
            <Grid item xs={12} lg={6} key={index} px={0}>
              <FormControlLabel
                disabled={option?.disable}
                sx={{ height: "100%", width: "100%", fontSize: "13px" }}
                value={option?.value ? option.value : "undefined"}
                control={
                  <Radio
                    sx={{
                      fontSize: "10px",
                      "& .MuiSvgIcon-root": { fontSize: 24 },
                    }}
                  />
                }
                label={option.label}
                onChange={() => {
                  setTitle(option?.label);
                  setReduxState &&
                    dispatch(
                      setReduxState({ key: "title", value: option?.label })
                    );
                }}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
