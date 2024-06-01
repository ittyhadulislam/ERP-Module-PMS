import React, { useEffect, useState } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import SubmitButton from "../buttons/SubmitButton";
import { useSelector } from "react-redux";
import {
  useLazyGetB2bInfoQuery,
  useLazyGetB2bLcQuery,
  useLazyGetMasterLcNoQuery,
} from "../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import CustomTable from "../table/CustomTable";
import {
  useRenameMutation,
  useTransferMutation,
} from "../../redux/features/commercial/backToBackLC/mutationBackToBackLC";
import { successToast } from "../../common/toaster/toaster";

const LCTransferAndRename = () => {
  const { company } = useSelector((state) => state.backToBackLC);
  const [fromMasterLc, setFromMasterLc] = useState(null);
  const [toMasterLc, setToMasterLc] = useState(null);
  const [masterLc, setMasterLc] = useState(null);
  const [b2bLc, setB2bLc] = useState(null);
  const [fromData, setFromData] = useState([]);
  const [toMasterLcData, setToMasterLcData] = useState([]);
  const [selectedB2b, setSelectedB2b] = useState("");
  const [renameTxt, setRename] = useState("");

  // transfer from master to master
  const [transfer, { data: transferData, isLoading: transferLoading }] =
    useTransferMutation();
  // rename from master to master
  const [
    rename,
    { data: renameData, error: renameError, isLoading: renameLoading },
  ] = useRenameMutation();

  // get master lc
  const [getLcData, { data: masterLcData, isLoading: masterLcLoading }] =
    useLazyGetMasterLcNoQuery();
  // get B2bLc
  const [getB2bLcData, { data: b2bData, isLoading: b2bLoading }] =
    useLazyGetB2bLcQuery();

  useEffect(() => {
    if (masterLc) {
      getB2bLcData(masterLc?.contract_Slno);
    }
  }, [masterLc, renameData]);

  useEffect(() => {
    if (company) {
      getLcData(company?.company_ID);
    }
  }, [company]);
  // get from master lc data
  const [
    getDataFrom,
    { data: fromDataLc, isLoading: fromLoading, error: fromError },
  ] = useLazyGetB2bInfoQuery();
  useEffect(() => {
    if (fromMasterLc) {
      getDataFrom(fromMasterLc?.contract_Slno);
    }
  }, [fromMasterLc, transferData]);
  // get to master lc data
  const [getDataTo, { data: toData, isLoading: toLoading, error: toError }] =
    useLazyGetB2bInfoQuery();
  useEffect(() => {
    if (toMasterLc) {
      getDataTo(toMasterLc?.contract_Slno);
    }
  }, [toMasterLc, transferData]);

  useEffect(() => {
    if (fromDataLc) {
      setFromData(
        fromDataLc?.data?.map((e) => ({
          ...e,
          id: e.b2BLC_Slno,
          isSelect: false,
        }))
      );
    }
    if (fromError) {
      setFromData([]);
    }
  }, [fromDataLc, fromError]);

  useEffect(() => {
    if (toData) {
      setToMasterLcData(
        toData?.data?.map((e) => ({
          ...e,
          id: e.b2BLC_Slno,
        }))
      );
    }
    if (toError) {
      setToMasterLcData([]);
    }
  }, [toData, toError]);

  // handle check fn
  const handleCheck = (id) => {
    setSelectedB2b(id);
    setFromData((prev) =>
      prev.map((e) => {
        if (id === e.id) {
          return { ...e, isSelect: true };
        } else {
          return { ...e, isSelect: false };
        }
      })
    );
  };
  // from master lc column
  const fromColumn = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        const { isSelect, id } = row?.row;
        return (
          <input
            style={{ cursor: "pointer" }}
            type="radio"
            checked={isSelect}
            onClick={() => handleCheck(id)}
          />
        );
      },
      minWidth: 50,
      maxWidth: 55,
    },
    {
      field: "b2BLCNo",
      headerName: "BBLC #",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "b2BLC_Value",
      headerName: "Value",
      minWidth: 70,
      flex: 1,
    },
  ];
  // to master lc column
  const toColumn = [
    {
      field: "b2BLCNo",
      headerName: "BBLC #",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "b2BLC_Value",
      headerName: "Value",
      minWidth: 70,
      flex: 1,
    },
  ];

  // handle transfer
  const handleTransfer = (e) => {
    e.preventDefault();
    transfer({
      fromId: fromMasterLc?.contract_Slno,
      toId: toMasterLc?.contract_Slno,
      fromB2bId: selectedB2b,
    });
  };

  //handleRename fn
  const handleRename = (e) => {
    e.preventDefault();
    rename({ b2bId: b2bLc?.b2BLC_Slno, txt: renameTxt });
  };

  //toaster
  useEffect(() => {
    if (renameData) {
      successToast(renameData.message);
      setB2bLc(null);
      setRename("");
    }
  }, [renameData]);
  useEffect(() => {
    if (renameError) {
      successToast(renameError.data.message);
    }
  }, [renameError]);

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleTransfer}>
          <CustomAppBar title={"Transfer Back to Back LC"} />
          <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
            <Grid container spacing={1} mt={"5px"}>
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  label={"From Master LC/Contract"}
                  options={
                    company
                      ? masterLcData?.data?.filter(
                          (e) => e.contract_Slno !== toMasterLc?.contract_Slno
                        ) ?? []
                      : []
                  }
                  value={fromMasterLc}
                  optionLabel={"cContractNo"}
                  optionId={"contract_Slno"}
                  loading={masterLcLoading}
                  setSelectedValue={setFromMasterLc}
                  required={true}
                />
                {fromMasterLc && (
                  <Box sx={{ mt: 0.5 }}>
                    <CustomTable
                      rows={fromData ?? []}
                      columns={fromColumn}
                      loading={fromLoading}
                      height={fromData?.data?.length > 0 ? "auto" : "100px"}
                      toolBar={false}
                      overlay={false}
                      hideFooter={true}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  label={"To Master LC/Contract"}
                  options={
                    company
                      ? masterLcData?.data?.filter(
                          (e) => e.contract_Slno !== fromMasterLc?.contract_Slno
                        ) ?? []
                      : []
                  }
                  value={toMasterLc}
                  optionLabel={"cContractNo"}
                  optionId={"contract_Slno"}
                  loading={masterLcLoading}
                  setSelectedValue={setToMasterLc}
                  required={true}
                />
                {toMasterLc && (
                  <Box sx={{ mt: 0.5 }}>
                    <CustomTable
                      rows={toMasterLcData ?? []}
                      columns={toColumn}
                      loading={toLoading}
                      height={toMasterLcData.length > 0 ? "auto" : "100px"}
                      toolBar={false}
                      overlay={false}
                      hideFooter={true}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <SubmitButton
                  title={"transfer"}
                  type="submit"
                  fullWidth
                  loading={transferLoading}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleRename}>
          <CustomAppBar title={"Rename Back to Back LC"} />
          <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
            <Grid container spacing={1} mt={"5px"}>
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  label={"Master LC"}
                  options={company ? masterLcData?.data ?? [] : []}
                  value={masterLc}
                  optionLabel={"cContractNo"}
                  optionId={"contract_Slno"}
                  loading={masterLcLoading}
                  setSelectedValue={setMasterLc}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  label={"Back To Back LC"}
                  options={masterLc ? b2bData?.data ?? [] : []}
                  value={b2bLc}
                  optionLabel={"b2BLCNo"}
                  optionId={"b2BLC_Slno"}
                  loading={b2bLoading}
                  setSelectedValue={setB2bLc}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextInput
                  label={"Rename Back To Back LC To"}
                  value={renameTxt}
                  setStateValue={setRename}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SubmitButton
                  title={"Rename"}
                  type="submit"
                  fullWidth
                  loading={renameLoading}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default LCTransferAndRename;
