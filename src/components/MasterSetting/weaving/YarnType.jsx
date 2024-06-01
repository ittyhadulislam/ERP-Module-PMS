import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import CustomTable from "../../table/CustomTable";
import { useGetWeavingMasterYarnTypeQuery } from "../../../redux/features/weaving/masterSetup/queryMasterSetup";
import { useSaveYarnTypeMutation } from "../../../redux/features/weaving/masterSetup/mutationMasterSetup";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { formateDate } from "../../../utils/formateDate";

const YarnType = () => {
  const [name, setName] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const { userName } = useSelector((state) => state.auth.user);
  console.log(selectedRow);
  //   get table data
  const { data, isLoading, refetch } = useGetWeavingMasterYarnTypeQuery();

  // save yarn type
  const [
    saveYarnType,
    { data: saveData, isLoading: saveLoading, isError, isSuccess, error },
  ] = useSaveYarnTypeMutation();
  // handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      yarnTypeId: 0,
      yarnTypes: name,
      createdBy: userName,
    };

    const updatePayload = {
      yarnTypeId: selectedRow?.yt_id,
      yarnTypes: name,
      createdBy: userName,
    };
    saveYarnType(selectedRow ? updatePayload : payload);
  };

  useEffect(() => {
    if (selectedRow) {
      setName(selectedRow?.yt_description);
    }
  }, [selectedRow]);
  //   table columns
  const columns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box sx={{ ml: 1 }}>
            <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => {
                setSelectedRow(row?.row);
              }}
            >
              <BiEdit size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 50,
      maxWidth: 55,
      flex: 1,
    },
    {
      field: "yt_description",
      headerName: "Yarn Type",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "yt_created_by",
      headerName: "created by",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "yt_created_date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      maxWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];

  //   toaster setup
  useEffect(() => {
    if (isSuccess) {
      successToast(saveData?.message);
      setName("");
      setSelectedRow(null);
      refetch();
    }
  }, [saveData, isSuccess]);
  useEffect(() => {
    isError && errorToast("Something Went Wrong!");
  }, [error, isError]);

  return (
    <Grid
      container
      sx={{
        border: `1px solid #1976d2`,
        padding: "10px",
        borderRadius: "2px",
      }}
    >
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <>
            <CustomAppBar title={"Form Parameter"} />
            <Grid sx={{ border: `1px solid #1976d2`, padding: "5px" }}>
              <Grid container spacing={1} mt={0.1}>
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    label="Yarn Type"
                    value={name}
                    setStateValue={setName}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SubmitButton
                    title={selectedRow ? "Update" : "Add"}
                    fullWidth
                    type="submit"
                    loading={saveLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        </form>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Box>
          <CustomTable
            columns={columns}
            loading={isLoading}
            rows={data ? data?.map((e, i) => ({ ...e, id: i + 1 })) : []}
            height={data?.length > 0 ? "50vh" : "350px"}
            toolbarOptions={{}}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default YarnType;
