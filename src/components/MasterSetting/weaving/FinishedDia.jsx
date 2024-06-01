import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { formateDate } from "../../../utils/formateDate";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import CustomTable from "../../table/CustomTable";
import { useGetWeavingMasterDiaQuery } from "../../../redux/features/weaving/masterSetup/queryMasterSetup";
import { useSaveDiaMutation } from "../../../redux/features/weaving/masterSetup/mutationMasterSetup";
import { errorToast, successToast } from "../../../common/toaster/toaster";

const FinishedDia = () => {
  const [name, setName] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const { userName } = useSelector((state) => state.auth.user);
  console.log(selectedRow);
  //   get table data
  const { data, isLoading, refetch } = useGetWeavingMasterDiaQuery();

  // save yarn type
  const [
    saveDia,
    { data: saveData, isLoading: saveLoading, isError, isSuccess, error },
  ] = useSaveDiaMutation();
  // handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      // diaID: 0,
      fabricDiaName: name,
      createdBy: userName,
    };

    const updatePayload = {
      diaID: selectedRow?.yt_id,
      fabricDiaName: name,
      createdBy: userName,
    };
    saveDia(selectedRow ? updatePayload : payload);
  };

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

  useEffect(() => {
    if (selectedRow) {
      setName(selectedRow?.dia_name);
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
      field: "dia_name",
      headerName: "Yarn Type",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "dia_created_by",
      headerName: "created by",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "dia_created_date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      maxWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];

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
                    label="Finished Dia"
                    type="number"
                    value={name}
                    setStateValue={setName}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SubmitButton
                    title={selectedRow ? "Update" : "Add"}
                    fullWidth
                    // title={"add"}
                    type="submit"
                    // loading={saveLoading}
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

export default FinishedDia;
