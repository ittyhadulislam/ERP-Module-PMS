/* eslint-disable react/prop-types */
// const CustomMultiAutocomplete2 = ({
//     options = [],
//     loading = false,
//     label,
//     setSelectedValue = () => { },
//     handleChange = () => { },
//     optionLabel,
//     optionId,
//     setValue = () => { },
//     setLocalState = () => { },
//     setReduxState = null,
//     value = [],
//     name = "",
//     required = false,
//     disabled = false,
// }) => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (!value) {
//             setSelectedValue([]);
//             setLocalState((prev) => ({ ...prev, [name]: [] }));
//             setReduxState && dispatch(setReduxState({ key: name, value: [] }));
//         } else {
//             setLocalState((prev) => ({ ...prev, [name]: value }));
//             setReduxState && dispatch(setReduxState({ key: name, value }));
//         }
//     }, [value]);

//     const isExist = value?.every((val) =>
//         options.some((opt) => opt[optionId] === val[optionId])
//     );

//     useEffect(() => {
//         if (!isExist) {
//             value = [];
//             setSelectedValue([]);
//             setLocalState((prev) => ({ ...prev, [name]: [] }));
//             setReduxState && dispatch(setReduxState({ key: name, value: [] }));
//         }
//     }, [isExist]);

//     return (
//         <Autocomplete
//             multiple
//             id="tags-outlined-drop"
//             size="small"
//             className="without-padding"
//             options={options}
//             filterOptions={createFilterOptions({
//                 matchFrom: "start",
//                 stringify: (option) => option[optionLabel]?.toString(),
//             })}
//             disabled={disabled}
//             getOptionLabel={(option) => option[optionLabel]?.toString()}
//             onChange={(e, newValue) => {
//                 setSelectedValue(newValue);
//                 setValue(
//                     optionId,
//                     newValue.map((opt) => opt[optionId]?.toString())
//                 );
//                 setLocalState((prev) => ({ ...prev, [name]: newValue }));
//                 setReduxState &&
//                     dispatch(setReduxState({ key: name, value: newValue }));
//             }}
//             isOptionEqualToValue={(option, value) =>
//                 option[optionId] === value[optionId]
//             }
//             value={value || []}
//             loading={loading}
//             renderInput={(params) => (
//                 <TextField
//                     fullWidth
//                     {...params}
//                     label={label}
//                     required={required}
//                     InputLabelProps={{
//                         sx: { fontWeight: 600, fontSize: "10px" },
//                     }}
//                     placeholder="search"
//                     onChange={handleChange}
//                     sx={{
//                         fontSize: "11px",
//                         "& .MuiInputBase-root": {
//                             fontSize: "11px",
//                         },
//                         // "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
//                         //     padding: "2px",
//                         // },
//                     }}
//                 />
//             )}
//             renderOption={(props, option, { selected }) => (
//                 <li
//                     {...props}
//                     style={{
//                         backgroundColor: selected ? "lightGreen" : "inherit",
//                         transition: "background-color 0.1s",
//                         fontSize: "11px",
//                         borderRadius: "2px",
//                         padding: "2px",
//                         paddingLeft: "10px",
//                     }}
//                     // style={{
//                     //     backgroundColor: selected || show ? "lightGreen" : "inherit",
//                     //     transition: "background-color 0.1s",
//                     //     fontSize: "13px",
//                     //     borderRadius: "3px",
//                     // }}
//                     onMouseEnter={(e) => {
//                         if (!selected) {
//                             e.target.style.backgroundColor = "#ccc";
//                         }
//                     }}
//                     onMouseLeave={(e) => {
//                         if (!selected) {
//                             e.target.style.backgroundColor = "inherit";
//                         }
//                     }}
//                 >
//                     {option[optionLabel]}
//                 </li>
//             )}
//         />
//     );
// };

import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CustomMultiAutocomplete = ({
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
            // className="without-padding"
            options={options}
            filterOptions={createFilterOptions({
                matchFrom: "start",
                stringify: (option) => option[optionLabel]?.toString(),
            })}
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
            renderOption={(props, option, { selected }) => (
                <li
                    {...props}
                    style={{
                        backgroundColor: selected ? "lightGreen" : "inherit",
                        transition: "background-color 0.1s",
                        fontSize: "13px",
                        borderRadius: "3px",
                        // padding: "2px",
                        // paddingLeft: "10px",
                    }}
                    onMouseEnter={(e) => {
                        if (!selected) {
                            e.target.style.backgroundColor = "#ccc";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!selected) {
                            e.target.style.backgroundColor = "inherit";
                        }
                    }}
                >
                    {option[optionLabel]}
                </li>
            )}
        />
    );
};

export default CustomMultiAutocomplete;
