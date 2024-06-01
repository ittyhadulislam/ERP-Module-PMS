/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useDispatch } from 'react-redux';

const CustomRadioButtonForLocal = ({
    groupQuantity = [],
    setState = () => { },
}) => {
    const dispatch = useDispatch()
    return (
        <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="1"
            >
                {
                    groupQuantity?.map((singleRadioButton, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                value={singleRadioButton?.value ? singleRadioButton?.value : "undefined"}
                                control={
                                    <Radio
                                        sx={{
                                            fontSize: "10px",
                                            "& .MuiSvgIcon-root": { fontSize: 24 },
                                        }}
                                    />
                                }
                                label={singleRadioButton.label}
                                onChange={(e) => {
                                    setState(e.target.value)
                                }}
                            />
                        )
                    })
                }
            </RadioGroup>
        </FormControl >
    );
};

export default CustomRadioButtonForLocal;