import React, { useEffect, useState } from "react";
import CustomTextInput from "../inputs/CustomTextInput";
import { Box, Grid, Stack } from "@mui/material";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import { useSelector } from "react-redux";
import {
  useGetInputFloorQuery,
  useGetInputLineQuery,
} from "../../redux/features/cutting/inputCutPanel/queryInputCutPanel";
import SubmitButton from "../buttons/SubmitButton";
import CustomTable from "../table/CustomTable";
import ReportButton from "../buttons/ReportButton";
import {
  useSaveLineDetailsMutation,
  useUpdateLineDetailsMutation,
} from "../../redux/features/sewing/lineDetails/mutationLineDetails";
import {
  useGetLineDetailsReportQuery,
  useGetLineDetailsUpdateQuery,
  useGetLineDetailsViewQuery,
} from "../../redux/features/sewing/lineDetails/queryLineDetails";
import { formateDate } from "../../utils/formateDate";
import UpdateButton from "../buttons/UpdateButton";
import { successToast } from "../../common/toaster/toaster";
import ReportViewer from "../report/ReportViewer";

const LineDetailsInput = () => {
  const { user } = useSelector((state) => state.auth);
  const [date, setDate] = useState(null);
  const [floor, setFloor] = useState(null);
  const [line, setLine] = useState(null);
  const [dayTarget, setDayTarget] = useState("");
  const [machine, setMachine] = useState("");
  const [helper, setHelper] = useState("");
  const [offTime, setOffTime] = useState("");
  const [costPerMin, setCostPerMin] = useState("");
  const [workMin, setWorkMin] = useState("");
  const [remarks, setRemarks] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);

  //reset all values
  const resetAllValues = () => {
    // setDate(null);
    // setFloor(null);
    setLine(null);
    setDayTarget("");
    setMachine("");
    setHelper("");
    setOffTime("");
    setCostPerMin("");
    setWorkMin("");
    setRemarks("");
  };

  //get Floor data
  const { data: floorData, isLoading: isFloorLoading } = useGetInputFloorQuery(
    user?.companyID
  );
  // get Line data
  const { data: lineData, isLoading: isLineLoading } = useGetInputLineQuery({
    id: user?.companyID,
    floor: floor?.nFloor,
  });

  //get line details view data
  const {
    data: lineDetails,
    isLoading: isLineDetailsLoading,
    refetch,
  } = useGetLineDetailsViewQuery({ id: user?.companyID, date: date });
  //get line details update data
  const { data: lineDetailsUpdate } = useGetLineDetailsUpdateQuery(
    {
      id: user?.companyID,
      line: line?.line_Code,
      floor: floor?.nFloor,
      date: date,
    },
    { refetchOnMountOrArgChange: true }
  );

  //get report data
  const {
    data: reportData,
    isLoading: isReportLoading,
    refetch: refetchReport,
  } = useGetLineDetailsReportQuery({
    id: user?.companyID,
    date: formateDate(date),
    user: user?.userName,
  });

  //save line details
  const [saveLineDetails, { data: saveData, isLoading: isSaveLoading }] =
    useSaveLineDetailsMutation();
  //save line details
  const [updateLineDetails, { data: updateData, isLoading: isUpdateLoading }] =
    useUpdateLineDetailsMutation();

  // handle save func
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalManPower = parseInt(helper) + parseInt(machine);

    const payload = {
      date: date,
      lineID: line?.line_Code,
      floorID: floor?.nFloor,
      mop: parseInt(machine),
      totalManPower: parseInt(totalManPower),
      lineHelper: parseInt(helper),
      offtime: parseInt(offTime),
      workminute: parseInt(workMin),
      lineCM: parseFloat(costPerMin),
      targetPerDay: parseInt(dayTarget),
      comID: user?.companyID,
      remarks: remarks ?? "",
      userName: user?.userName,
    };

    saveLineDetails(payload);
  };
  //handle update
  const handleUpdate = () => {
    const totalManPower = parseInt(helper) + parseInt(machine);
    const payload = {
      id: lineDetailsUpdate[0]?.ld_id,
      date: date,
      lineID: line?.line_Code,
      floorID: floor?.nFloor,
      mop: parseInt(machine),
      totalManPower: parseInt(totalManPower),
      lineHelper: parseInt(helper),
      offtime: parseInt(offTime),
      workminute: parseInt(workMin),
      lineCM: parseFloat(costPerMin),
      targetPerDay: parseInt(dayTarget),
      comID: user?.companyID,
      remarks: remarks ?? "",
      userName: user?.userName,
    };

    updateLineDetails(payload);
  };

  //handleReport function
  const handleReport = () => {
    if (reportData) {
      setReportDataView(null);
      refetchReport();
      // setModalOpen(false);
      setModalOpen(true);
    } else {
      refetchReport();
      // setModalOpen(true);
    }
  };

  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  //state management
  useEffect(() => {
    if (!floor) setLine(null);
  }, [floor]);
  useEffect(() => {
    if (lineDetailsUpdate) {
      setDayTarget(lineDetailsUpdate[0]?.lDayTgt);
      setMachine(lineDetailsUpdate[0]?.lMo);
      setHelper(lineDetailsUpdate[0]?.lHlp);
      setOffTime(lineDetailsUpdate[0]?.lOfftime);
      setCostPerMin(lineDetailsUpdate[0]?.lcm);
      setWorkMin(lineDetailsUpdate[0]?.lWrkMint);
      setRemarks(lineDetailsUpdate[0]?.lLineRem);
    }
  }, [lineDetailsUpdate]);

  // toaster
  useEffect(() => {
    if (saveData) {
      successToast(saveData.message);
      resetAllValues();
      refetch();
    }
    if (updateData) {
      successToast(updateData.message);
      resetAllValues();
      refetch();
    }
  }, [saveData, updateData]);

  const lineDetailsView = lineDetails?.map((row, i) => ({ ...row, id: i + 1 }));
  const viewColumns = [
    {
      field: "id",
      headerName: "id",
      accessor: "action",
      minWidth: 45,
      maxWidth: 45,
      flex: 1,
    },
    {
      field: "lDate",
      headerName: "Date",
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => formateDate(params.value),
    },
    { field: "cCmpName", headerName: "company", minWidth: 250, flex: 1 },
    {
      field: "cFloor_Descriptin",
      headerName: "Floor No",
      minWidth: 100,
      flex: 1,
    },
    { field: "line_No", headerName: "Line", minWidth: 80, flex: 1 },
    { field: "lMo", headerName: "Operator", minWidth: 100, flex: 1 },
    { field: "lHlp", headerName: "Helper", minWidth: 100, flex: 1 },
    {
      field: "ltMo",
      headerName: "Total Manpower",
      minWidth: 150,
      flex: 1,
    },
    { field: "lOfftime", headerName: "Off Time", minWidth: 80, flex: 1 },
    { field: "lWrkMint", headerName: "Work Minute", minWidth: 120, flex: 1 },
    { field: "lcm", headerName: "Cost/Minute", minWidth: 110, flex: 1 },
    { field: "lDayTgt", headerName: "Day Target", minWidth: 100, flex: 1 },
    { field: "lLineRem", headerName: "Remarks", minWidth: 100, flex: 1 },
    { field: "input_user", headerName: "Created By", minWidth: 120, flex: 1 },
    {
      field: "input_date",
      headerName: "Created Date",
      minWidth: 100,
      valueGetter: (params) => formateDate(params.value),
      flex: 1,
    },
  ];
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomAppBar title={"Line Information"} />
        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDatePicker
                label={"Date"}
                name="bookingDate"
                // prevDate={1}
                // futureDate={1}
                disableFuture={true}
                value={date}
                setData={setDate}
                required={true}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={3}>
          <CustomAutocomplete
            // setValue={setValue}
            label={"Company"}
            options={[]}
            // value={selectedStyle}
            optionLabel={"cStyleNo"}
            optionId={"nStyleID"}
            // loading={isLoading}
            // setSelectedValue={setSelectedStyle}
            // required={true}
          />
        </Grid> */}
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Floor"}
                options={floorData ?? []}
                value={floor}
                optionLabel={"cFloor_Descriptin"}
                optionId={"nFloor"}
                loading={isFloorLoading}
                setSelectedValue={setFloor}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Line"}
                options={lineData ?? []}
                value={line}
                optionLabel={"line_No"}
                optionId={"line_Code"}
                loading={isLineLoading}
                setSelectedValue={setLine}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Day Target (Pcs)"}
                isNumber={true}
                maxLength={4}
                value={dayTarget}
                setStateValue={setDayTarget}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Machine Operator"}
                maxLength={2}
                isNumber={true}
                value={machine}
                setStateValue={setMachine}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Helper"}
                maxLength={2}
                isNumber={true}
                value={helper}
                setStateValue={setHelper}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Off Time (Minute)"}
                maxLength={2}
                isNumber={true}
                value={offTime}
                setStateValue={setOffTime}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Cost Per Minute ($)"}
                type="number"
                // maxLength={4}
                // isNumber={true}
                value={costPerMin}
                setStateValue={setCostPerMin}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Work Minute"}
                maxLength={3}
                isNumber={true}
                value={workMin}
                setStateValue={setWorkMin}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <CustomTextInput
                label={"Remarks"}
                value={remarks}
                setStateValue={setRemarks}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ p: 1, border: "1px dashed grey" }}>
          <Box sx={{ my: 1, mb: 1, border: "1px dashed grey", mr: "1px" }}>
            <Stack
              direction={"row"}
              p={0.5}
              spacing={2}
              justifyContent="space-between"
            >
              <span></span>

              <span style={{ margin: "0px" }}>
                <ReportButton
                  title={"report"}
                  handleClick={handleReport}
                  loading={isReportLoading}
                  // disabled={reportData}
                />
                {lineDetailsUpdate?.length > 0 ? (
                  <UpdateButton
                    title={"Update"}
                    type="button"
                    handleClick={handleUpdate}
                    // handleClick={}
                    loading={isUpdateLoading}
                    //   disabled={selectedRow.length <= 0 || showApproval}
                  />
                ) : (
                  <SubmitButton
                    title={"Add"}
                    type="submit"
                    // handleClick={}
                    loading={isSaveLoading}
                    //   disabled={selectedRow.length <= 0 || showApproval}
                  />
                )}
              </span>
            </Stack>
          </Box>
          <CustomAppBar title={"View"} />
          <CustomTable
            // columns={sizeInfoColumns}
            // rows={color ? finalSizeInfo ?? [] : []}
            columns={viewColumns}
            rows={lineDetailsView ?? []}
            toolBar={true}
            hideFooter={true}
            pagePerSize={99}
            loading={isLineDetailsLoading}
            height={lineDetailsView?.length > 0 ? "auto" : "230px"}

            // checkboxSelection={true}
            // setSelectedRows={setSelectedRows}
            // isSuccess={isSuccess}
          />
        </Box>
      </form>
      <ReportViewer
        title={"Line Wise Man Power, Target and CM Report"}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </>
  );
};

export default LineDetailsInput;
