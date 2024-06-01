import React, { useEffect } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomTextInput from "../../inputs/CustomTextInput";
import {
  useGetForeignSupplierQuery,
  useLazyGetForeignB2bQuery,
} from "../../../redux/features/commercial/importInvoiceForeign/queryforeign";
import { useDispatch, useSelector } from "react-redux";
import { setForeignInvoice } from "../../../redux/features/commercial/importInvoiceForeign/foreignSlice";

const InvoiceInput = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const { supplier, b2bLc, ref, invoice, date, adjustments } = useSelector(
    (state) => state.foreignInvoice
  );

  // get supplier
  const { data: supplierData, isLoading: supplierLoading } =
    useGetForeignSupplierQuery(userName);
  // use get b2b
  const [getData, { data: b2bData, isLoading: b2bLoading }] =
    useLazyGetForeignB2bQuery();

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
              setReduxState={setForeignInvoice}
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
              setReduxState={setForeignInvoice}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Ref."}
              name="ref"
              value={ref}
              setReduxState={setForeignInvoice}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Invoice"}
              name="invoice"
              value={invoice}
              setReduxState={setForeignInvoice}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              label={"Date"}
              name="date"
              value={date}
              setReduxState={setForeignInvoice}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Adjustments"}
              name="adjustments"
              type="number"
              value={adjustments}
              setReduxState={setForeignInvoice}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvoiceInput;
