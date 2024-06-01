import React, { useEffect, useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { Box, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import InputExportData from "./InputExportData";
import SizeInfo from "./SizeInfo";
import CustomTable from "../table/CustomTable";
import { useGetExportAddViewDataQuery } from "../../redux/features/export/exportChallan/queryExportChallan";
import {
  useCompleteExportDataMutation,
  useDeleteExportDataMutation,
  useSaveExportDataMutation,
} from "../../redux/features/export/exportChallan/mutationExportChallan";
import { successToast, warningToast } from "../../common/toaster/toaster";
import { LoadingButton } from "@mui/lab";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import ReturnButton from "../buttons/ReturnButton";
import {
  useActiveSewingProductionMutation,
  useInActiveSewingProductionMutation,
} from "../../redux/features/sewing/sewingProduction/mutationSewingProduction";
import { BsBarChartSteps } from "react-icons/bs";
import ReportModal from "../report/ReportModal";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import { useGetSewingShipOutQuery } from "../../redux/features/sewing/sewingProduction/querySewingProduction";
import { useGetFabricBuyerQuery } from "../../redux/features/cutting/fabric/queryFabric";
import { initialState } from ".";

const ExportChallanInput = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalBuyer, setModalBuyerBuyer] = useState(null);
  const [modalStyle, setModalStyle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //  form state management
  const [localState, setLocalState] = useState(initialState);

  // Get Export Add View Data Query
  const {
    data: viewData,
    isLoading: viewDataLoading,
    refetch: viewRefetch,
  } = useGetExportAddViewDataQuery(user?.userName, {
    refetchOnMountOrArgChange: true,
  });

  //save Export Data Mutation
  const [saveExportData, { isSuccess: saveSuccess, isLoading: saveLoading }] =
    useSaveExportDataMutation();
  // useDeleteExportDataMutation
  const [deleteExportData, { isSuccess: isDeleteSuccess }] =
    useDeleteExportDataMutation();
  // Complete Export Data Mutation
  const [
    completeExportData,
    { isLoading: completeLoading, isSuccess: completeSuccess },
  ] = useCompleteExportDataMutation();
  //get buyer data
  const { data: buyerData, isLoading: isBuyerLoading } = useGetFabricBuyerQuery(
    user?.companyID
  );
  //get buyer data
  const { data: modalStyleData, isLoading: isModalStyleLoading } =
    useGetSewingShipOutQuery(modalBuyer?.nBuyer_ID);
  //active shipt out
  const [
    activeSewingProduction,
    { data: activeData, isSuccess: activeSuccess },
  ] = useActiveSewingProductionMutation();
  //inActive shipt out
  const [
    inActiveSewingProduction,
    { data: inActiveData, isSuccess: inActiveSuccess },
  ] = useInActiveSewingProductionMutation();

  //handleShipOut function
  const handleShipOut = () => {
    const payload = {
      styleID: modalStyle?.nOStyleId,
      userName: user?.userName,
    };
    activeSewingProduction(payload);
  };
  //handleNotShipOut function
  const handleNotShipOut = () => {
    const payload = {
      styleID: modalStyle?.nOStyleId,
      userName: user?.userName,
    };
    inActiveSewingProduction(payload);
  };
  // Destructuring Local State
  const {
    buyer,
    color,
    company,
    conversion,
    date,
    deliveryTo,
    depoName,
    driveLicense,
    driverName,
    exportQty,
    plusShipmentQty,
    exportUnit,
    floor,
    gmtQty,
    gmtUnit,
    gps,
    invoiceNo,
    lockNo,
    mobileNo,
    poNo,
    productionCountry,
    remarks,
    sewingFactory,
    shipCountry,
    shipMode,
    style,
    totalBalanceQty,
    totalExportQty,
    totalGMTQty,
    totalOrderQty,
    totalPacketQty,
    trackVCno,
    transport,
  } = localState;
  // handle save functionality
  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      factoryID: sewingFactory?.nCompanyID,
      buyerID: buyer?.nBuyer_ID,
      styleID: style?.nStyleID,
      expDate: date,
      deliveryTo: deliveryTo?.exp_to,
      deponame: depoName?.depo_name,
      invoice: invoiceNo,
      po: poNo?.pO_No,
      countryID: productionCountry?.nConCode,
      shipcountryID: shipCountry?.nConCode,
      colorID: color?.nColNo,
      carrier: transport,
      trackNo: trackVCno,
      shiftfrom: company?.nCompanyID,
      floorID: floor?.nFloor,
      gps: gps,
      driverlicence: driveLicense,
      drivername: driverName,
      lockNo: lockNo,
      shipmode: shipMode?.sm_id,
      drivermobile: mobileNo,
      exportqty: parseInt(gmtQty),
      plusshipQty: parseInt(plusShipmentQty),
      ctnqty: parseInt(exportQty),
      exportunit: exportUnit?.ex_uid,
      remarks: remarks,
      userName: user?.userName,
    };
    saveExportData(payload);
  };
  const handleDeleteExportData = (id) => {
    deleteExportData(id);
  };
  // handle Complete function
  const handleCompleteExportData = () => {
    completeExportData([
      {
        completedBy: user?.userName,
      },
    ]);
  };
  const columns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      renderCell: (row) => {
        return (
          <Box
            sx={{
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              margin: "auto",
            }}
          >
            <LoadingButton
              variant="outlined"
              size="small"
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => {
                handleDeleteExportData(row?.row?.exp_id);
                // setSelectedMainCategory(row.original.nMainCategory_ID);
              }}
              // title={"Edit"}
              // loading
            >
              <MdOutlineDelete size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 70,
      maxWidth: 70,
      flex: 1,
    },
    {
      field: "sew_factory",
      headerName: "Sewing Factory",
      minWidth: 170,
      flex: 1,
    },
    // { field: "cBuyer_Name", headerName: "Buyer", minWidth: 150, flex: 1 },
    { field: "cStyleNo", headerName: "Style", minWidth: 200, flex: 1 },
    { field: "exp_po", headerName: "po", minWidth: 200, flex: 1 },
    { field: "cColour", headerName: "color", minWidth: 200, flex: 1 },
    { field: "cConDes", headerName: "country", minWidth: 200, flex: 1 },
    { field: "shift_from", headerName: "Shift From", minWidth: 200, flex: 1 },
    { field: "cFloor_Descriptin", headerName: "floor", minWidth: 120, flex: 1 },
    { field: "exp_del_to", headerName: "Delivery to", minWidth: 200, flex: 1 },
    { field: "exp_depo_name", headerName: "Depo Name", minWidth: 100, flex: 1 },
    { field: "exp_invoice", headerName: "Invoice No", minWidth: 120, flex: 1 },
    { field: "exp_track_no", headerName: "Truck No", minWidth: 90, flex: 1 },
    {
      field: "exp_driver_name",
      headerName: "Driver Name",
      minWidth: 120,
      flex: 1,
    },
    { field: "exp_lock", headerName: "Lock No", minWidth: 80, flex: 1 },
    {
      field: "exp_qty",
      headerName: "Export Qty (Pcs)",
      minWidth: 140,
      flex: 1,
    },
    { field: "exp_ctnQty", headerName: "Carton Qty", minWidth: 100, flex: 1 },
  ];
  const tableView = viewData?.map((row, i) => ({ ...row, id: i }));
  // validation toaster
  useEffect(() => {
    if (gmtQty > totalBalanceQty) {
      setLocalState((prev) => ({ ...prev, gmtQty: 0 }));
      warningToast("GMT Qty Cannot Exceed Balance Qty");
    }
  }, [gmtQty]);
  useEffect(() => {
    if (exportQty > totalBalanceQty) {
      setLocalState((prev) => ({ ...prev, exportQty: 0 }));
      warningToast("Export Qty Cannot Exceed Balance Qty");
    }
  }, [exportQty]);
  // save toaster
  useEffect(() => {
    if (saveSuccess) {
      successToast("Data Added Successfully");
      setLocalState((prev) => ({ ...prev, gmtQty: 0, exportQty: 0 }));
      viewRefetch();
    }
  }, [saveSuccess]);
  // delete toaster
  useEffect(() => {
    if (isDeleteSuccess) {
      successToast("Data Deleted Successfully");
      viewRefetch();
    }
  }, [isDeleteSuccess]);
  // complete toaster
  useEffect(() => {
    if (completeSuccess) {
      successToast("Complete Successfully");
      viewRefetch();
    }
  }, [completeSuccess]);

  useEffect(() => {
    inActiveSuccess && successToast(inActiveData.message);
    activeSuccess && successToast(activeData.message);
  }, [inActiveSuccess, activeSuccess]);

  return (
    <>
      <form onSubmit={handleSave}>
        <InputExportData
          localState={localState}
          setLocalState={setLocalState}
        />

        <SizeInfo
          localState={localState}
          setLocalState={setLocalState}
          saveSuccess={saveSuccess}
        />
        <Box sx={{ mb: 1, p: 1, border: "1px dashed grey" }}>
          <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
            <Stack
              direction={"row"}
              p={0.5}
              spacing={2}
              justifyContent="space-between"
            >
              <span></span>

              <span>
                <SubmitButton
                  title={"add"}
                  type="submit"
                  loading={saveLoading}
                  disabled={
                    gmtQty > totalBalanceQty ||
                    exportQty > totalBalanceQty ||
                    gmtQty <= 0 ||
                    exportQty <= 0
                  }
                />
              </span>
            </Stack>
          </Box>
        </Box>
        <CustomTable
          // checkboxSelection={true}
          columns={columns}
          rows={tableView ?? []}
          loading={viewDataLoading}
          // setSelectedRows={setSelectedRows}
          // isSuccess={scmSuccess}
          height={tableView?.length > 0 ? "auto" : "280px"}
        />
        {/* <Box sx={{ mb: 1, p: 1, border: "1px dashed grey", mr: "1px" }}> */}
        <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
          <Stack
            direction={"row"}
            p={0.5}
            spacing={2}
            justifyContent="space-between"
          >
            <span style={{ margin: "0px" }}>
              <LoadingButton
                style={{ margin: "2px" }}
                sx={{ minWidth: "160px" }}
                // type={type}
                variant="contained"
                size="small"
                color="success"
                onClick={() => setShowModal(true)}
                // loading={loading}
                // disabled={disabled}
                loadingIndicator="Loading..."
              >
                <BsBarChartSteps
                  style={{
                    marginRight: "5px",
                    fontSize: "18px",
                    color: "white",
                  }}
                />
                style ship out
              </LoadingButton>
            </span>

            <span style={{ margin: "0px", width: "50%" }}>
              <Grid container spacing={0.5} mr={1}>
                <Grid item xs={12} sm={6}>
                  <Link to={"/for-approval"}>
                    <ReturnButton title={"go to approval"} fullWidth />
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SubmitButton
                    fullWidth
                    title={"Complete"}
                    handleClick={handleCompleteExportData}
                    loading={completeLoading}
                    disabled={tableView?.length <= 0}
                  />
                </Grid>
              </Grid>
            </span>
          </Stack>
        </Box>
        {/* </Box> */}
      </form>
      <div>
        <ReportModal
          maxWidth="600px"
          open={showModal}
          setOpen={setShowModal}
          title={"Style Ship Out"}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Buyer"}
                options={buyerData ?? []}
                value={modalBuyer}
                optionLabel={"cBuyer_Name"}
                optionId={"nBuyer_ID"}
                loading={isBuyerLoading}
                setSelectedValue={setModalBuyerBuyer}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Style No"}
                options={modalStyleData ?? []}
                value={modalStyle}
                optionLabel={"cStyleNo"}
                optionId={"nOStyleId"}
                loading={isModalStyleLoading}
                setSelectedValue={setModalStyle}
                required={true}
              />
            </Grid>
          </Grid>
          <Box sx={{ my: 1, mb: 1, border: "1px dashed grey", mr: "1px" }}>
            <Stack
              direction={"row"}
              p={0.5}
              spacing={2}
              justifyContent="space-between"
            >
              <span></span>

              <span style={{ margin: "0px" }}>
                <ReturnButton
                  title={"Not shift out"}
                  type="button"
                  handleClick={handleNotShipOut}
                />

                <SubmitButton
                  title={"shift out"}
                  type="button"
                  handleClick={handleShipOut}
                  // loading={isSaveLoading}
                  //   disabled={selectedRow.length <= 0 || showApproval}
                />
              </span>
            </Stack>
          </Box>
        </ReportModal>
      </div>
    </>
  );
};

export default ExportChallanInput;
