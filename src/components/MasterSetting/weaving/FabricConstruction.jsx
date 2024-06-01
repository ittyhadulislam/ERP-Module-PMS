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
import { useGetWeavingMasterConstructionQuery } from "../../../redux/features/weaving/masterSetup/queryMasterSetup";
import { useSaveConstructionMutation } from "../../../redux/features/weaving/masterSetup/mutationMasterSetup";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { initial } from "lodash";
const initialState = {
  construction: "",
  warp: "",
  weft: "",
  epi: "",
  ppi: "",
};
const FabricConstruction = () => {
  const [localState, setLocalState] = useState(initialState);
  const [name, setName] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const { userName } = useSelector((state) => state.auth.user);
  const { construction, warp, weft, epi, ppi } = localState;
  console.log(selectedRow);
  //   get table data
  const { data, isLoading, refetch } = useGetWeavingMasterConstructionQuery();

  // save yarn type
  const [
    saveConstruction,
    { data: saveData, isLoading: saveLoading, isError, isSuccess, error },
  ] = useSaveConstructionMutation();
  // handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      fConstructionID: 0,
      fabricConstructionName: construction,
      warpCount: +warp,
      weptCount: +weft,
      epi: +epi,
      ppi: +ppi,
      createdBy: userName,
    };

    const updatePayload = {
      fConstructionID: selectedRow?.fc_id,
      fabricConstructionName: construction,
      warpCount: +warp,
      weptCount: +weft,
      epi: +epi,
      ppi: +ppi,
      createdBy: userName,
    };
    saveConstruction(selectedRow ? updatePayload : payload);
  };

  //   toaster setup
  useEffect(() => {
    if (isSuccess) {
      successToast(saveData?.message);
      setLocalState(initial);
      setSelectedRow(null);
      refetch();
    }
  }, [saveData, isSuccess]);
  useEffect(() => {
    isError && errorToast("Something Went Wrong!");
  }, [error, isError]);

  useEffect(() => {
    if (selectedRow) {
      setLocalState((prev) => ({
        ...prev,
        construction: selectedRow.fc_construction,
      }));
      setLocalState((prev) => ({ ...prev, warp: selectedRow.fc_warp_count }));
      setLocalState((prev) => ({ ...prev, weft: selectedRow.fc_weft_count }));
      setLocalState((prev) => ({ ...prev, ppi: selectedRow.fc_ppi }));
      setLocalState((prev) => ({ ...prev, epi: selectedRow.fc_epi }));
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
      field: "fc_construction",
      headerName: "construction",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "fc_warp_count",
      headerName: "Warp",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "fc_weft_count",
      headerName: "Weft",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "fc_epi",
      headerName: "EPI",
      minWidth: 120,
      maxWidth: 140,
      flex: 1,
    },
    {
      field: "fc_ppi",
      headerName: "PPI",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "fc_created_by",
      headerName: "created by",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "fc_created_date",
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
                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="Construction"
                    name="construction"
                    value={construction}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="Warp"
                    name="warp"
                    type="number"
                    value={warp}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="Weft"
                    name="weft"
                    type="number"
                    value={weft}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="EPI"
                    name="epi"
                    type="number"
                    value={epi}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="PPI"
                    name="ppi"
                    type="number"
                    value={ppi}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
          <SubmitButton
            title={selectedRow ? "Update" : "Add"}
            fullWidth
            // title={"add"}
            type="submit"
            loading={saveLoading}
          />
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

export default FabricConstruction;
