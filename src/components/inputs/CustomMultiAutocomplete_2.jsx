/* eslint-disable react/prop-types */
import { Autocomplete, TextField, createFilterOptions } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const CustomMultiAutocomplete2 = ({
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
    value = [],
    name = "",
    required = false,
    disabled = false,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!value) {
            setSelectedValue([]);
            setLocalState((prev) => ({ ...prev, [name]: [] }));
            setReduxState && dispatch(setReduxState({ key: name, value: [] }));
        } else {
            setLocalState((prev) => ({ ...prev, [name]: value }));
            setReduxState && dispatch(setReduxState({ key: name, value }));
        }
    }, [value]);

    const isExist = value?.every((val) =>
        options.some((opt) => opt[optionId] === val[optionId])
    );

    useEffect(() => {
        if (!isExist) {
            value = [];
            setSelectedValue([]);
            setLocalState((prev) => ({ ...prev, [name]: [] }));
            setReduxState && dispatch(setReduxState({ key: name, value: [] }));
        }
    }, [isExist]);

    return (
        <Autocomplete
            multiple
            id="tags-outlined-drop"
            size="small"
            options={options}
            filterOptions={createFilterOptions({
                matchFrom: "start",
                stringify: (option) => option[optionLabel]?.toString(),
            })}
            isOptionEqualToValue={(option, value) =>
                option[optionId] === value[optionId]
            }
            // onChange={(e, newValue) => {
            //     if (newValue) {
            //         setReduxState &&
            //             dispatch(setReduxState({ key: name, value: newValue }));
            //     } else {
            //         setReduxState &&
            //             dispatch(setReduxState({ key: name, value: [] }));
            //     }
            // }}
            getOptionLabel={(option) => option[optionLabel].toString()}
            onChange={(e, newValue) => {
                setSelectedValue(newValue);
                setValue(
                    optionId,
                    newValue.map((opt) => opt[optionId]?.toString())
                );
                setLocalState((prev) => ({ ...prev, [name]: newValue }));
                setReduxState &&
                    dispatch(setReduxState({ key: name, value: newValue }));
            }}
            value={value || []}
            loading={loading}
            disabled={disabled}
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
                    // sx={{
                    //     fontSize: "11px",
                    //     "& .MuiInputBase-root": {
                    //         fontSize: "11px",
                    //     },
                    //     "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                    //         padding: "2px",
                    //     },
                    // }}
                    sx={{
                        fontSize: "13px",
                        "& .MuiInputBase-root": {
                            fontSize: "13px", // You can adjust this value as needed
                        },
                    }}
                />
            )}
        />
    )
}

export default CustomMultiAutocomplete2