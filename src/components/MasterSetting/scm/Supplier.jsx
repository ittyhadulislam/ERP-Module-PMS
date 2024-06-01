import React, { useEffect, useState } from "react";
import SupplierForm from "../../scm/masterSetup/supplier/SupplierForm";
import { Box, Grid } from "@mui/material";
import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { useGetSupplierDetailsQuery } from "../../../redux/features/scm/masterSetup/queryMasterSetup";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { useSaveAndUpdateMutation } from "../../../redux/features/scm/masterSetup/mutationMasterSetup";
import { useSelector } from "react-redux";
import SubmitButton from "../../buttons/SubmitButton";

const initialState = {
  supplierName: "",
  attention: "",
  mobile: "",
  email: "",
  country: null,
  address: "",
};

const Supplier = () => {
  const [localState, setLocalState] = useState(initialState);
  const [selectedRow, setSelectedRow] = useState(null);

  const { supplierName, attention, mobile, email, country, address } =
    localState;
  const { userName } = useSelector((state) => state.auth.user);

  // get supplier data for table
  const { data, isLoading, refetch } = useGetSupplierDetailsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  //   save supplier data for table
  const [
    saveAndUpdate,
    { data: saveData, isLoading: saveLoading, isError, isSuccess, error },
  ] = useSaveAndUpdateMutation();

  // handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      // "supplierID": "string",
      supplierName: supplierName,
      attension: attention,
      mobile: mobile,
      email: email,
      country: country?.cor_id,
      address: address,
      userName: userName,
    };

    const updatePayload = {
      supplierID: selectedRow?.sn_id,
      supplierName: supplierName,
      attension: attention,
      mobile: mobile,
      email: email,
      country: country?.cor_id,
      address: address,
      userName: userName,
    };
    saveAndUpdate(selectedRow ? updatePayload : payload);
  };

  //   toaster setup
  useEffect(() => {
    if (isSuccess) {
      successToast(saveData?.message);
      setLocalState(initialState);
      refetch();
    }
  }, [saveData, isSuccess]);
  useEffect(() => {
    isError && errorToast("Something Went Wrong!");
  }, [error, isError]);

  useEffect(() => {
    if (selectedRow) {
      setLocalState((prev) => ({ ...prev, supplierName: selectedRow.sn_name }));
      setLocalState((prev) => ({ ...prev, attention: selectedRow.sn_atten }));
      setLocalState((prev) => ({ ...prev, mobile: selectedRow.sn_att_mobile }));
      setLocalState((prev) => ({ ...prev, email: selectedRow.sn_email }));
      setLocalState((prev) => ({
        ...prev,
        country: {
          cor_id: selectedRow.cor_id,
          cor_description: selectedRow.cor_description,
        },
      }));
      setLocalState((prev) => ({ ...prev, address: selectedRow.sn_address }));
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
      field: "sn_name",
      headerName: "Supplier",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "sn_atten",
      headerName: "Attention",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "sn_att_mobile",
      headerName: "Mobile",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "sn_email",
      headerName: "Email",
      minWidth: 120,
      maxWidth: 140,
      flex: 1,
    },
    {
      field: "sn_address",
      headerName: "Address",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "sn_crt_nm",
      headerName: "created by",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "sn_date",
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
          <SupplierForm localState={localState} setLocalState={setLocalState} />

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

export default Supplier;
