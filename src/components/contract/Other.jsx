import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import CustomAppBar from "../common/CustomAppBar";
import CustomTextInput from "../inputs/CustomTextInput";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import UpdateButton from "../buttons/UpdateButton";
import SubmitButton from "../buttons/SubmitButton";
import { useGetComOtherDataQuery } from "../../redux/features/commercial/contract/queryContract";
import { useSelector } from "react-redux";
import { useRenameContractMutation } from "../../redux/features/commercial/contract/mutationContract";
import { errorToast, successToast } from "../../common/toaster/toaster";

const Other = () => {
  const { company } = useSelector((state) => state.contract);
  const [oldName, setOldName] = useState(null);
  const [newName, setNewName] = useState("");
  // get other data
  const { data, isLoading } = useGetComOtherDataQuery(company?.company_ID, {
    refetchOnMountOrArgChange: true,
  });

  // rename contract
  const [
    renameContract,
    {
      data: renameData,
      isLoading: renameLoading,
      error: renameError,
      isSuccess: renameSuccess,
    },
  ] = useRenameContractMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      companyID: company?.company_ID,
      oldContractID: oldName?.contract_Slno,
      oldContractName: oldName?.cContractNo,
      newContractName: newName,
    };
    renameContract(payload);
  };

  // toaster
  useEffect(() => {
    if (renameData && renameSuccess) {
      successToast(renameData.message);
      setNewName("");
      setOldName(null);
    }
  }, [renameData]);
  useEffect(() => {
    renameError && errorToast(renameError.message);
  }, [renameError]);
  return (
    <>
      <CustomAppBar title={"Rename contract"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={4}>
              <CustomAutocomplete
                label={"Old Contract"}
                options={company ? data?.data ?? [] : []}
                value={oldName}
                optionLabel={"cContractNo"}
                optionId={"contract_Slno"}
                loading={isLoading}
                setSelectedValue={setOldName}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label={"New Contract"}
                name="newName"
                required
                value={newName}
                setStateValue={setNewName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SubmitButton
                title={"Rename"}
                type="submit"
                loading={renameLoading}
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Other;
