/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const CustomMultiAutocomplete = ({
    options = [],
    loading = false,
    label = "",
    setSelectedValue = () => { },
    // handelChange = () => { },
    setValue = () => { },
    setLocalState = () => { },
    setReduxState = null,
    value = "",
    name = "",
    optionLabel,
    optionId
}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!value) {
            setSelectedValue(null)
            setLocalState((prev) => ({ ...prev, [name]: null }))
            setReduxState && dispatch(setReduxState({ key: name, value: null }))
        }
        if (value) {
            setValue(optionId, value[optionId])
            setLocalState((prev) => ({ ...prev, [name]: value }));
            setReduxState && dispatch(setReduxState({ key: name, value }));
        }
    }, [value])
    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            size='small'
            options={options}
            loading={loading}
            getOptionLabel={(option) => option[optionLabel].toString()}
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
            InputLabelProps={{
                sx: { fontWeight: 600, fontSize: "14px" },
            }}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    fullWidth
                    {...params}
                    label={label}
                    placeholder="search"
                    sx={{
                        '& .MuiInputBase-root': {
                            fontSize: '13px', // You can adjust this value as needed
                        },
                    }}

                />
            )}
        />
    )
}

export default CustomMultiAutocomplete