import React, { useEffect } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomTextInput from "../../inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetLocalSupplierQuery,
  useLazyGetLocalB2bQuery,
} from "../../../redux/features/commercial/importInvoiceLocal/queryLocal";
import { setLocalInvoice } from "../../../redux/features/commercial/importInvoiceLocal/localSlice";

const InvoiceInput = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const { supplier, b2bLc, ref, invoice, date, adjustments } = useSelector(
    (state) => state.localInvoice
  );

  // get supplier
  const { data: supplierData, isLoading: supplierLoading } =
    useGetLocalSupplierQuery(userName);
  // use get b2b
  const [getData, { data: b2bData, isLoading: b2bLoading }] =
    useLazyGetLocalB2bQuery();

  useEffect(() => {
    if (supplier) {
      getData(supplier?.benificiery);
    }
  }, [supplier]);

  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"Supplier"}
              name="supplier"
              options={supplierData?.data ?? []}
              value={supplier}
              optionLabel={"cSupName"}
              optionId={"benificiery"}
              loading={supplierLoading}
              setReduxState={setLocalInvoice}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"B2B LC"}
              name="b2bLc"
              options={supplier ? b2bData?.data ?? [] : []}
              value={b2bLc}
              optionLabel={"b2BLCNo"}
              optionId={"b2BLC_Slno"}
              loading={b2bLoading}
              setReduxState={setLocalInvoice}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Ref."}
              name="ref"
              value={ref}
              setReduxState={setLocalInvoice}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Invoice"}
              name="invoice"
              value={invoice}
              setReduxState={setLocalInvoice}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              label={"Date"}
              name="date"
              value={date}
              setReduxState={setLocalInvoice}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Adjustments"}
              name="adjustments"
              type="number"
              value={adjustments}
              setReduxState={setLocalInvoice}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvoiceInput;
