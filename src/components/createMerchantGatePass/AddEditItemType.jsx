import React, { useEffect, useState } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomTextInput from "../inputs/CustomTextInput";
import AddButton from "../buttons/AddButton";
import CustomTable from "../table/CustomTable";
import { useGetItemTypeViewQuery } from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassQuery";
import { formateDate } from "../../utils/formateDate";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import ErrorButton from "../buttons/ErrorButton";
import {
  useSaveItemTypeMutation,
  useUpdateItemTypeMutation,
} from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassMutation";
import { errorToast, successToast } from "../../common/toaster/toaster";
import { useSelector } from "react-redux";

const AddEditItemType = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [selectedTableRow, setSelectedTableRow] = useState(null);
  const [itemType, setItemType] = useState("");

  // get add view data
  const {
    data: addViewData,
    isLoading: addViewLoading,
    refetch,
  } = useGetItemTypeViewQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // save mutation
  const [saveItemType, { data, isSuccess, isLoading, isError, error }] =
    useSaveItemTypeMutation();
  // Update mutation
  const [
    updateItemType,
    {
      data: updateData,
      isSuccess: updateSuccess,
      isLoading: updateLoading,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateItemTypeMutation();

  //    handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    // create payload
    const payload = {
      itemtype: itemType,
      createname: userName,
    };

    // edit payload
    const editPayload = {
      id: selectedTableRow?.gp_id,
      itemtype: itemType,
      createname: userName,
    };

    selectedTableRow ? updateItemType(editPayload) : saveItemType(payload);
  };

  // handle effect for event and form data
  useEffect(() => {
    if (selectedTableRow) {
      setItemType(selectedTableRow.gp_description);
    } else {
      setItemType("");
    }
  }, [selectedTableRow]);

  // toaster setup
  useEffect(() => {
    isError && errorToast("Something went wrong!");
  }, [error]);
  useEffect(() => {
    isSuccess && successToast("Save Successfully! ");
    isSuccess && refetch();
  }, [data]);
  useEffect(() => {
    isUpdateError && errorToast("Something went wrong!");
  }, [updateError]);
  useEffect(() => {
    updateSuccess && successToast("Update Successfully! ");
    updateSuccess && refetch();
  }, [updateData]);

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      accessor: "Edit",
      align: "center",
      renderCell: (row) => {
        return (
          <Box>
            <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => setSelectedTableRow(row?.row)}
              // title={"Edit"}
              // loading
            >
              <BiEdit size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 60,
      maxWidth: 60,
    },

    { field: "gp_description", headerName: "Item Type", minWidth: 300 },
    { field: "gp_crt_nm", headerName: "Created By", minWidth: 200 },
    {
      field: "gp_crt_dt",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 200,
      //   minWidth: 120,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <CustomAppBar title={"Input parameters"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"1px"}>
          <Grid item xs={12} sm={6} md={6}>
            <CustomTextInput
              label={"Item Type"}
              value={itemType}
              setStateValue={setItemType}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <ErrorButton
              fullWidth
              title={"clear"}
              handleClick={() => {
                setSelectedTableRow(null);
                setItemType("");
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <AddButton
              fullWidth
              title={selectedTableRow ? "Update" : "save"}
              type="submit"
              loading={isLoading || updateLoading}
            />
          </Grid>
        </Grid>
      </Box>

      <CustomTable
        columns={columns}
        rows={addViewData?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        loading={addViewLoading}
        height={addViewData?.length > 0 ? "auto" : "280px"}
      />
    </form>
  );
};

export default AddEditItemType;
