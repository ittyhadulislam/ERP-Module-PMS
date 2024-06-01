import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import SubmitButton from "../../buttons/SubmitButton";
import CustomTable from "../../table/CustomTable";
import { successToast, warningToast } from "../../../common/toaster/toaster";
import { useSelector } from "react-redux";
import {
  useGetInputColorQuery,
  useGetInputCountryQuery,
  useGetInputCutNoQuery,
  useGetInputCutPanelAddViewQuery,
  useGetInputCutPanelViewQuery,
  useGetInputCutReportQuery,
  useGetInputFloorQuery,
  useGetInputLineQuery,
  useGetInputPoQuery,
  useGetInputStyleQuery,
} from "../../../redux/features/cutting/inputCutPanel/queryInputCutPanel";
import {
  useCompleteInputCutPanelMutation,
  useDeleteInputCutPanelMutation,
  useSaveInputCutPanelMutation,
} from "../../../redux/features/cutting/inputCutPanel/mutationInputCutPanel";
import { BsTrash } from "react-icons/bs";
import { formateDate } from "../../../utils/formateDate";
import ReturnButton from "../../buttons/ReturnButton";
import { Link } from "react-router-dom";
import ReportButton from "../../buttons/ReportButton";
import ReportViewer from "../../report/ReportViewer";

const CutPanelInput = () => {
  const { user } = useSelector((state) => state.auth);
  const [style, setStyle] = useState(null);
  const [po, setPo] = useState(null);
  const [country, setCountry] = useState(null);
  const [color, setColor] = useState(null);
  const [floor, setFloor] = useState(null);
  const [line, setLine] = useState(null);
  const [cutNo, setCutNo] = useState(null);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState("");
  const [pattern, setPattern] = useState("");
  const [remarks, setRemarks] = useState("");
  const [finalSizeInfo, setFinalSizeInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  //get style data
  const { data: styleData, isLoading: isStyleLoading } = useGetInputStyleQuery(
    user?.companyID
  );
  //get PO data
  const { data: poData, isLoading: isPoLoading } = useGetInputPoQuery({
    id: user?.companyID,
    Style: style?.nStyleID,
  });
  //get Country data
  const { data: countryData, isLoading: isCountryLoading } =
    useGetInputCountryQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
    });

  //get Color data
  const { data: colorData, isLoading: isColorLoading } = useGetInputColorQuery({
    id: user?.companyID,
    style: style?.nStyleID,
    po: po?.cOrderNu,
    country: country?.nConCode,
  });
  //get Floor data
  const { data: floorData, isLoading: isFloorLoading } = useGetInputFloorQuery(
    user?.companyID
  );
  // get Line data
  const { data: lineData, isLoading: isLineLoading } = useGetInputLineQuery({
    id: user?.companyID,
    floor: floor?.nFloor,
  });
  //get cut No data
  const { data: cutNoData, isLoading: isCutNoLoading } = useGetInputCutNoQuery({
    id: user?.companyID,
    style: style?.nStyleID,
    po: po?.cOrderNu,
    country: country?.nConCode,
    color: color?.nColNo,
  });
  // get cut panel view data
  const {
    data: cutPanelData,
    isLoading: isCutPanelLoading,
    refetch: refetchCutData,
  } = useGetInputCutPanelViewQuery({
    id: user?.companyID,
    style: style?.nStyleID,
    po: po?.cOrderNu,
    country: country?.nConCode,
    color: color?.nColNo,
  });
  //get add view data
  const {
    data: addViewData,
    isLoading: isAddViewLoading,
    refetch: refetchAddData,
  } = useGetInputCutPanelAddViewQuery({
    style: style?.nStyleID,
    user: user?.userName,
  });

  //get report data
  const {
    data: reportData,
    isLoading: isReportLoading,
    refetch: refetchReport,
  } = useGetInputCutReportQuery({
    id: user?.companyID,
    style: style?.nStyleID,
    po: po?.cOrderNu,
    user: user?.userName,
  });
  // save input cut panel data
  const [
    saveInputCutPanel,
    { data: saveInputData, isLoading: isSaveLoading, isSuccess: isSaveSuccess },
  ] = useSaveInputCutPanelMutation();
  // delete input cut panel data
  const [deleteInputCutPanel, { isSuccess: isDeleteSuccess }] =
    useDeleteInputCutPanelMutation();

  //complete Input Cut Panel

  const [completeInputCutPanel, { data: completeData }] =
    useCompleteInputCutPanelMutation();

  const sizeInfoColumns = [
    {
      field: "sizeID",
      headerName: "id",
      accessor: "action",
      minWidth: 45,
      maxWidth: 45,
      flex: 1,
    },

    { field: "cSize", headerName: "size", maxWidth: 90, flex: 1 },
    {
      field: "cutqty",
      headerName: "Total Cut Quantity",
      //   maxWidth: 200,
      flex: 1,
    },
    {
      field: "inputQty",
      headerName: "Total Input Quantity",
      //   maxWidth: 200,
      flex: 1,
    },
    {
      field: "inputBalQty",
      headerName: "Total Balance Quantity",
      //   maxWidth: 90,
      flex: 1,
    },
    {
      field: "",
      headerName: "Input Qty",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        const { sizeID, inputBalQty, inputQuantity } = row?.row;
        return (
          <input
            type="text"
            maxLength="10"
            onInput={(e) => {
              if (e.target.value > inputBalQty) {
                e.target.value = "";
                return warningToast("Input Quantity Cannot Exceed Cut Qty");
              }
              if (isNaN(parseInt(e.target.value))) {
                e.target.value = 0;
                return warningToast("Please Enter a Number");
              } else {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }
            }}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            value={inputQuantity ?? ""}
            onChange={(e) =>
              handleTextFieldChange(sizeID, e.target.value, "inputQuantity")
            }
          />
        );
      },
    },
  ];

  const addViewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <span
              onClick={() => handleDelete(row?.row)}
              style={{ color: "#1976d2", cursor: "pointer" }}
            >
              Delete <BsTrash color="red" />
            </span>
          </Box>
        );
      },
      minWidth: 80,
      maxWidth: 80,
      flex: 1,
    },
    {
      field: "btStyle",
      headerName: "style",

      flex: 1,
    },

    { field: "pO_No", headerName: "po", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "btLineDes", headerName: "Line", flex: 1 },
    { field: "size", headerName: "size", flex: 1 },
    { field: "btQty", headerName: "Quantity", flex: 1 },
    {
      field: "btScanDate",
      headerName: "Input Date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 110,
      maxWidth: 110,
      flex: 1,
    },
    { field: "btScanBy", headerName: "Created By", maxWidth: 90, flex: 1 },
  ];

  const sizeInfoView = cutPanelData?.map((row, i) => ({ ...row, id: i }));
  const addView = addViewData?.map((row, i) => ({ ...row, id: i }));

  const handleTextFieldChange = (id, value, fieldName) => {
    setFinalSizeInfo((prev) =>
      prev?.map((e) => {
        if (id === e.sizeID) {
          return { ...e, [fieldName]: value };
        } else {
          return { ...e };
        }
      })
    );
  };

  // handleAdd function
  const handleAdd = (e) => {
    e.preventDefault();
    const payload = finalSizeInfo
      ?.filter((e) => e.inputQuantity)
      ?.map((e) => ({
        comID: user?.companyID,
        styleID: style?.nStyleID,
        style: style?.cStyleNo,
        // stage: 0,
        po: po?.cPoNum,
        country: country?.cConDes,
        countryID: country?.nConCode,
        lot: po?.cOrderNu,
        colorID: color?.nColNo,
        color: color?.cColour,
        lineID: line?.line_Code,
        line: line?.line_No,
        hour: parseInt(hour),
        inputdate: date,
        sizeID: e?.sizeID,
        size: e?.cSize,
        // statedes: "string",
        inputqty: parseInt(e?.inputQuantity),
        userName: user?.userName,
        // sendrcv: 0,
        cutno: cutNo?.cLayNo,
        patternno: pattern,
        remarks: remarks,
      }));

    saveInputCutPanel(payload);
  };

  // handleDelete function
  const handleDelete = (row) => {
    deleteInputCutPanel(row?.btBundleNo);
  };

  //handleReport function
  const handleReport = () => {
    if (reportData) {
      setReportDataView(null);
      refetchReport();
      // setModalOpen(false);
      setModalOpen(true);
    } else {
      warningToast("Please Select Style and PO");
    }
  };
  //handleComplete function
  const handleComplete = () => {
    completeInputCutPanel({
      completedby: user?.userName,
    });
  };

  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  useEffect(() => {
    if (cutPanelData) {
      setFinalSizeInfo(sizeInfoView);
    }
  }, [cutPanelData]);

  // state empty
  useEffect(() => {
    if (isSaveSuccess) {
      // setColor(null);
      // setFloor(null);
      // setLine(null);
      setCutNo(null);
      // setHour("");
      // setPattern("");
      // setRemarks("");
      setRemarks("");
      setFinalSizeInfo(sizeInfoView);
      // setFinalSizeInfo([]);
      successToast(saveInputData?.message);
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      successToast("Deleted Successfully");
      refetchCutData();
      refetchAddData();
      setFinalSizeInfo(sizeInfoView);
    }
  }, [isDeleteSuccess]);
  useEffect(() => {
    completeData && successToast("Completed Successfully");
    if (isSaveSuccess) {
      if (color) refetchCutData();
      refetchAddData();
    }
  }, [isSaveSuccess, completeData, color]);

  // state management
  useEffect(() => {
    if (!style) {
      setPo(null);
      setCountry(null);
      setColor(null);
      setCutNo(null);
    }
    if (!po) {
      setCountry(null);
      setColor(null);
      setCutNo(null);
    }
    if (!country) {
      setColor(null);
      setCutNo(null);
    }
    if (!color) {
      setCutNo(null);
    }
    if (!floor) {
      setLine(null);
    }
  }, [style, po, country, color, , floor]);

  return (
    <>
      <form onSubmit={handleAdd}>
        <CustomAppBar title={"Line Wise Input CUT Panel-Data"} />
        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Style"}
                options={styleData ?? []}
                value={style}
                optionLabel={"cStyleNo"}
                optionId={"nStyleID"}
                loading={isStyleLoading}
                setSelectedValue={setStyle}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"PO No"}
                options={poData ?? []}
                value={po}
                optionLabel={"cPoNum"}
                optionId={"cPoNum"}
                loading={isPoLoading}
                setSelectedValue={setPo}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Country"}
                options={countryData ?? []}
                value={country}
                optionLabel={"cConDes"}
                optionId={"nConCode"}
                loading={isCountryLoading}
                setSelectedValue={setCountry}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Color"}
                options={colorData ?? []}
                value={color}
                optionLabel={"cColour"}
                optionId={"nColNo"}
                loading={isColorLoading}
                setSelectedValue={setColor}
                required={true}
              />
            </Grid>
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
              <CustomDatePicker
                label={"Date"}
                name={"date"}
                // disableFuture={true}
                prevDate={1}
                futureDate={1}
                value={date}
                setData={setDate}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Cut Number"}
                options={cutNoData ?? []}
                value={cutNo}
                optionLabel={"cLayNo"}
                optionId={"cLayNo"}
                loading={isCutNoLoading}
                setSelectedValue={setCutNo}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Hour"}
                isNumber={true}
                maxLength={2}
                //   type="number"
                value={hour}
                setStateValue={setHour}
                required={true}
                //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Pattern Number"}
                //   maxLength={2}
                //   type="number"
                value={pattern}
                setStateValue={setPattern}
                required={true}
                //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CustomTextInput
                label={"Remarks"}
                value={remarks}
                setStateValue={setRemarks}
                //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
          <CustomAppBar title={"Size Info"} />
          <CustomTable
            columns={sizeInfoColumns}
            rows={color ? finalSizeInfo ?? [] : []}
            toolBar={false}
            hideFooter={true}
            pagePerSize={99}
            height={(color && finalSizeInfo?.length) > 0 ? "auto" : "180px"}
            loading={isCutPanelLoading}
          />
          <Box sx={{ my: 1, mb: 0, border: "1px dashed grey" }}>
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
                />
                <SubmitButton
                  title={"Add"}
                  type="submit"
                  // handleClick={}
                  loading={isSaveLoading}
                  //   disabled={selectedRow.length <= 0 || showApproval}
                />
              </span>
            </Stack>
          </Box>
        </Box>
      </form>

      <Box sx={{ p: 1, border: "1px dashed grey" }}>
        <CustomAppBar title={"View Add Data"} />
        <CustomTable
          columns={addViewColumns}
          rows={addView ?? []}
          toolBar={false}
          hideFooter={true}
          pagePerSize={99}
          height={addView?.length > 0 ? "auto" : "180px"}
          loading={isAddViewLoading}
        />
        <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
          <Stack
            direction={"row"}
            p={0.5}
            spacing={2}
            justifyContent="space-between"
          >
            <span style={{ margin: "0px" }}></span>

            <span style={{ margin: "0px" }}>
              <Link to={"/input-approval"}>
                <ReturnButton title={"go to approval"} />
              </Link>
              <SubmitButton
                title={"Complete"}
                type="button"
                handleClick={handleComplete}
                //   loading={isLoading}
                // disabled={addView?.length <= 0 || addView === undefined}
              />
            </span>
          </Stack>
        </Box>
      </Box>
      <ReportViewer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </>
  );
};

export default CutPanelInput;
