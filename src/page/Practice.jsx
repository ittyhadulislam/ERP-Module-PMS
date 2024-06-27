import React, { useState } from 'react';
import CustomMultiAutocomplete2 from '../components/inputs/CustomMultiAutocomplete2';
import CustomAutocomplete2 from '../components/inputs/CustomAutocomplete2';
import { useSelector } from 'react-redux';
import { useGetCompanyQuery } from '../redux/features/assetManagement/assetMaster/queryAssetMaster';
import { setAssetMaster } from '../redux/features/assetManagement/assetMaster/assetMasterSlice';

const Practice = () => {
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
    // const handelChange = (e, newValue) => {
    //     console.log(newValue)
    // }
    const { practice } = useSelector(state => state.assetMaster)
    const { data: companyData, isLoading: isCompanyLoading } = useGetCompanyQuery()
    return (
        <div>
            <CustomMultiAutocomplete2
                options={companyData ?? []}
                label='Multiple Autocomplete'
                name='practice'
                optionLabel={"cCmpName"}
                // handelChange={handelChange}
                setReduxState={setAssetMaster}
                value={practice}
            />
            {/* <CustomAutocomplete2
                label={"Company"}
                name='company'
                loading={isCompanyLoading}
                optionId={"nCompanyID"}
                options={companyData ?? []}
                optionLabel={"cCmpName"}
                // value={company}
                setReduxState={setAssetMaster}
                // setSelectedValue={setCompany}
                required={true}
            /> */}
        </div>
    );
};

export default Practice;