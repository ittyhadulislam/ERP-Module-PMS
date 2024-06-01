import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const CustomMultiAutocomplete = () => {
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },]
    return (
        <div className='my-3'>
            <Autocomplete
                multiple
                id="tags-outlined"
                size='small'
                options={top100Films}
                getOptionLabel={(option) => option.title}
                // defaultValue={[top100Films[13]]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        // helperText='hello'
                        fullWidth
                        {...params}
                        label="multi select Dropdown  "
                        placeholder="search"
                        sx={{
                            '& .MuiInputBase-root': {
                                fontSize: '13px', // You can adjust this value as needed
                            },
                        }}

                    />
                )}
            />
        </div>
    )
}

export default CustomMultiAutocomplete