import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AddButton from "../../buttons/AddButton";
import {
  useGetB2bOtherChargeQuery,
  useLazyGetExistingB2bOtherChargeQuery,
} from "../../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import CustomTable from "../../table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  errorToast,
  infoToast,
  successToast,
} from "../../../common/toaster/toaster";
import { useSaveOtherChangeMutation } from "../../../redux/features/commercial/backToBackLC/mutationBackToBackLC";
import { setBackToBack } from "../../../redux/features/commercial/backToBackLC/backToBackLcSlice";

const OtherCharge = () => {
  const dispatch = useDispatch();
  const { backToBackLC, company, existingChargeData } = useSelector(
    (state) => state.backToBackLC
  );
  const { userName } = useSelector((state) => state.auth.user);
  const [otherCharge, setOtherCharge] = useState([]);

  // Get B2b Other Charge
  const { data, isLoading } = useGetB2bOtherChargeQuery();
  // get existingCharge by back to back
  const [getData, { data: existingData, error: existingError }] =
    useLazyGetExistingB2bOtherChargeQuery();
  useEffect(() => {
    backToBackLC && getData(backToBackLC);
  }, [backToBackLC]);
  // save Other Charge
  const [
    saveOtherChange,
    {
      data: saveData,
      isError: saveIsError,
      error: saveError,
      isLoading: saveLoading,
      isSuccess: saveSuccess,
    },
  ] = useSaveOtherChangeMutation();
  useEffect(() => {
    if (existingChargeData?.length > 0) {
      setOtherCharge(
        existingChargeData?.map((e, i) => ({
          ...e,
          id: i + 1,
          b2boc_description: e.chargeName,
          b2boc_code: e.chargeId,
          value: e.chargeVal,
        }))
      );
    } else if (existingData?.data?.length > 0 && !existingError) {
      setOtherCharge(
        existingData?.data?.map((e, i) => ({
          ...e,
          id: i + 1,
          b2boc_description: e.chargeName,
          b2boc_code: e.chargeId,
          value: e.chargeVal,
        }))
      );
    } else {
      setOtherCharge(
        data?.data?.map((e, i) => ({ ...e, id: i + 1, value: 0 }))
      );
    }
  }, [data, existingChargeData, existingData, existingError]);

  const handleChange = (value, id) => {
    setOtherCharge((prev) =>
      prev.map((e) => {
        if (e.b2boc_code === id) {
          return { ...e, value: value };
        } else return e;
      })
    );
  };

  const totalCharge = otherCharge?.reduce(
    (accumulator, currentValue) => +currentValue.value + accumulator,
    0
  );
  useEffect(() => {
    dispatch(setBackToBack({ key: "otherCharge", value: totalCharge }));
  }, [totalCharge]);

  //   handleClick fn
  const handleClick = () => {
    if (!company) {
      infoToast("Please select a company!");
      return;
    }
    const payload = {
      companyID: company?.company_ID,
      b2bLcNo: backToBackLC,
      otherCharges: otherCharge.map((e) => ({
        b2boc_occode: e.b2boc_code,
        b2boc_value: e.value,
      })),
      userName: userName,
    };
    console.log(payload);
    saveOtherChange(payload);
  };

  //toaster
  useEffect(() => {
    if (saveData && saveSuccess) successToast(saveData?.message);
  }, [saveData]);
  useEffect(() => {
    if (saveError && saveIsError) errorToast(saveError?.data?.message);
  }, [saveError]);

  const columns = [
    {
      field: "b2boc_description",
      headerName: "Charges",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "b2boc_code",
      headerName: "Values",
      minWidth: 150,
      maxWidth: 150,
      flex: 1,

      renderCell: (row) => {
        const { b2boc_code, value } = row?.row;

        return (
          <>
            <input
              type="number"
              //   placeholder={id === 1 ? "Type Marketing Cost" : "Type PI Price"}
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
              value={value}
              onChange={(e) => {
                handleChange(e.target.value, b2boc_code);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="custom-style-for-accordion">
      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          Other Charges:&nbsp; <b>{totalCharge}</b>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} mt={1}>
              <CustomTable
                columns={columns}
                rows={otherCharge ?? []}
                loading={isLoading}
                height={otherCharge?.length > 0 ? "auto" : "270px"}
                hideFooter
                toolBar={false}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <AddButton
                title={"add"}
                fullWidth
                handleClick={handleClick}
                loading={saveLoading}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OtherCharge;
