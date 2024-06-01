import { Grid } from "@mui/material";
import { useGetSupplierNameQuery } from "../../../redux/features/scm/masterSetup/queryMasterSetup";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import SubmitButton from "../../buttons/SubmitButton";
import { useSaveSupplierCodeMutation } from "../../../redux/features/scm/masterSetup/mutationMasterSetup";
import { successToast } from "../../../common/toaster/toaster";
import { useSelector } from "react-redux";

const SupplierCode = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [supplier, setSupplier] = useState(null);
  // get supplier data for table
  const { data, isLoading, refetch } = useGetSupplierNameQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  //   saveSupplierCode mutation
  const [
    saveSupplierCode,
    {
      data: saveData,
      isLoading: saveLoading,
      isSuccess: saveSuccess,
      error,
      isError,
    },
  ] = useSaveSupplierCodeMutation();

  function generateRandomNumberWithDigits(numDigits) {
    if (numDigits <= 0) {
      return "";
    }
    const min = Math.pow(10, numDigits - 1); // Minimum number based on the number of digits
    const max = Math.pow(10, numDigits) - 1; // Maximum number based on the number of digits
    const finalNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "DG" + supplier?.sup_id + finalNumber.toString();
  }

  const tempId = 11 - supplier?.sup_id.toString().length - 2;
  const res = generateRandomNumberWithDigits(tempId);

  //   handleClick fn
  const handleClick = () => {
    const payload = {
      supplierID: supplier?.sup_id,
      supplierCode: res,
      userName: userName,
    };
    saveSupplierCode(payload);
  };

  //   toaster setup
  useEffect(() => {
    if (saveSuccess) {
      successToast(saveData?.message);
      refetch();
    }
  }, [saveData, saveSuccess]);
  useEffect(() => {
    isError && errorToast("Something Went Wrong!");
  }, [error, isError]);

  return (
    <Grid
      container
      spacing={1}
      sx={{
        border: `1px solid #1976d2`,
        padding: "10px",
        borderRadius: "2px",
      }}
    >
      <Grid item xs={12}>
        <CustomAppBar title={"generate code"} />
        <Grid sx={{ border: `1px solid #1976d2`, padding: "5px" }}>
          <Grid container spacing={1} mt={0.1}>
            <Grid item xs={12} md={6}>
              <CustomAutocomplete
                label="Supplier"
                name="country"
                optionLabel={"supName"}
                optionId={"sup_id"}
                options={data ?? []}
                value={supplier}
                setSelectedValue={setSupplier}
                //   setLocalState={isLoading}
                loading={isLoading}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                label="Code"
                name="address"
                value={supplier ? res : ""}
                //   setLocalState={setLocalState}
                required
              />
            </Grid>
            <SubmitButton
              title={"save"}
              fullWidth
              handleClick={handleClick}
              loading={saveLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SupplierCode;
