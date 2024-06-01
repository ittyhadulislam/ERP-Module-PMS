import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import { useSelector } from "react-redux";
import { useGetCompanyByUserQuery } from "../../../redux/features/common/commonQuery";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import ReportButton from "../../buttons/ReportButton";
import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";
import {
  useGetHourlyProductionDashboardQuery,
  useGetHourlyProductionReportQuery,
} from "../../../redux/features/sewing/hourlyProduction/queryHourlyProductin";
import { calculateWorkingHours } from "../../../utils/calculatehourAndMin";
import { getDateTime } from "../../../utils/getDateTime";
import Hints from "../../common/Hints";
import ReportViewer from "../../report/ReportViewer";

const HourlyProductionInput = () => {
  const { user } = useSelector((state) => state.auth);

  const [company, setCompany] = useState(null);
  const [date, setDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);

  //get company
  const { data: companyData, isLoading: isCompanyLoading } =
    useGetCompanyByUserQuery(user?.companyID);

  //get hourly production data
  const { data: hourlyProductionData, isLoading: isProductionLoading } =
    useGetHourlyProductionDashboardQuery(
      {
        id: company?.nCompanyID,
        date: date,
      },
      { pollingInterval: 10000 }
    );

  //get hourly production report
  const {
    data: reportData,
    isLoading: isProductionReportLoading,
    refetch: refetchReport,
  } = useGetHourlyProductionReportQuery({
    id: user?.companyID,
    date: date,
    user: user?.userName,
  });

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

  //table columns
  const viewColumns = [
    {
      field: "cFloor_Descriptin",
      headerName: "Floor",
      accessor: "action",
      minWidth: 90,
      maxWidth: 95,
      flex: 1,
    },
    { field: "aLine", headerName: "line", minWidth: 80, flex: 1 },
    {
      field: "lMo",
      headerName: "M.P",
      description: "manpower",
      minWidth: 50,
      flex: 1,
    },
    { field: "cBuyer_Name", headerName: "buyer", minWidth: 150, flex: 1 },
    { field: "cStyleNo", headerName: "style", minWidth: 150, flex: 1 },
    {
      field: "cGmetDis",
      headerName: "item",
      minWidth: 150,
      flex: 1,
    },
    { field: "pro_smv", headerName: "smv", minWidth: 80, flex: 1 },
    {
      field: "lDayTgt",
      headerName: "l.T",
      description: "Line Target",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "htrgt",
      headerName: "h.T",
      description: "Hour Target",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr1",
      headerName: "1",

      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }

        const cumulative = calculateWorkingHours();
        const firstHour = row?.row?.aHr1;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 1 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 1
                  ? "gray"
                  : firstHour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{firstHour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr2",
      headerName: "2",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr2;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 2 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 2
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr3",
      headerName: "3",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr3;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 3 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 3
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr4",
      headerName: "4",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr4;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 4 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 4
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr5",
      headerName: "5",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr5;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 5 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 5
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr6",
      headerName: "6",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr6;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 6 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 6
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr7",
      headerName: "7",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr7;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 7 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 7
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr8",
      headerName: "8",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr8;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 8 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 8
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr9",
      headerName: "9",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr9;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 9 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 9
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr10",
      headerName: "10",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr10;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 10 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 10
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr11",
      headerName: "11",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr11;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 11 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 11
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "aHr12",
      headerName: "12",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let isToday = false;
        if (getDateTime() === today) {
          isToday = true;
        } else {
          isToday = false;
        }
        const cumulative = calculateWorkingHours();
        const hour = row?.row?.aHr12;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background:
                cumulative.runningHour === 12 && isToday
                  ? "#41ce59"
                  : isToday && cumulative.runningHour <= 12
                  ? "gray"
                  : hour >= row?.row?.htrgt
                  ? "green"
                  : "#d75353",
              width: "100%",
              color: "white",
            }}
          >
            <span>{hour}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "totqty",
      headerName: "t.p",
      description: "Total Production",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "production11",
      headerName: "c.t",
      description: "Cumulative Target",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let value = null;
        if (getDateTime() === today) {
          const cumulative = calculateWorkingHours();
          value = parseInt(cumulative.perHourlyProduction * row?.row?.htrgt);
        } else {
          value = row?.row?.lDayTgt;
        }

        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <span>{value}</span>
          </Box>
        );
      },
      minWidth: 50,
      flex: 1,
    },
    {
      field: "production12",
      headerName: "production behind",
      renderCell: (row) => {
        const today = formateDate(row?.row?.aDate);
        let value = null;
        if (getDateTime() === today) {
          const cumulative = calculateWorkingHours();
          value = parseInt(cumulative.perHourlyProduction * row?.row?.htrgt);
        } else {
          value = row?.row?.lDayTgt;
        }
        const finalValue = row?.row?.totqty - value;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background: finalValue <= 0 ? "#d75353" : "green",
              width: "100%",
              color: "white",
            }}
          >
            <span style={{}}>{finalValue}</span>
          </Box>
        );
      },
      minWidth: 150,
      flex: 1,
    },
    {
      field: "totalDefect",
      headerName: "defected",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "defact1",
      headerName: "defected %",
      renderCell: (row) => {
        const defected = (row?.row?.totalDefect / row?.row?.totqty) * 100;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // background: finalValue <= 0 ? "#d75353" : "green",
              // width: "100%",
              // color: "white",
            }}
          >
            <span>{defected.toFixed(2)} %</span>
          </Box>
        );
      },
      minWidth: 105,
      flex: 1,
    },
    {
      field: "totalCheck",
      headerName: "total check",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "totalDHU",
      headerName: "dhu",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "ddd2",
      headerName: "dhu calc.",
      renderCell: (row) => {
        const dhuCalc = (row?.row?.totalDHU / row?.row?.totalCheck) * 100;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // background: finalValue <= 0 ? "#d75353" : "green",
              // width: "100%",
              // color: "white",
            }}
          >
            <span>{dhuCalc.toFixed(2)}</span>
          </Box>
        );
      },
      minWidth: 80,
      flex: 1,
    },

    {
      field: "cCmpNallme",
      headerName: "S/E(-/+)",

      renderCell: (row) => {
        const se = row?.row?.totqty - row?.row?.lDayTgt;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // background: finalValue <= 0 ? "#d75353" : "green",
              // width: "100%",
              // color: "white",
            }}
          >
            <span>{se}</span>
          </Box>
        );
      },
      minWidth: 60,
      flex: 1,
    },
    { field: "thour", headerName: "Hour", minWidth: 60, flex: 1 },
    {
      field: "cCwmpName",
      headerName: "Achieved %",
      renderCell: (row) => {
        const achieved = Math.round(
          (row?.row?.totqty / row?.row?.lDayTgt) * 100
        );
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // background: finalValue <= 0 ? "#d75353" : "green",
              // width: "100%",
              // color: "white",
            }}
          >
            <span>{achieved} %</span>
          </Box>
        );
      },
      minWidth: 100,
      flex: 1,
    },
    {
      field: "Gap",
      headerName: "Gap %",
      renderCell: (row) => {
        const gap = Math.round((row?.row?.totqty / row?.row?.lDayTgt) * 100);
        const finalGap = 100 - gap;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background: finalGap >= 0 ? "#d75353" : "green",
              width: "100%",
              color: "white",
            }}
          >
            <span>{finalGap} %</span>
          </Box>
        );
      },
      minWidth: 70,
      flex: 1,
    },
  ];
  // columns grouping
  const colGroup = [
    {
      groupId: "internal_data",
      headerName: "hourly production",
      description: "",
      renderHeaderGroup: (params) => (
        <span
          style={{ textAlign: "center", width: "inherit", marginRight: "0px" }}
        >
          {params?.headerName}
        </span>
      ),
      children: [
        { field: "aHr1" },
        { field: "aHr2" },
        { field: "aHr3" },
        { field: "aHr4" },
        { field: "aHr5" },
        { field: "aHr6" },
        { field: "aHr7" },
        { field: "aHr8" },
        { field: "aHr9" },
        { field: "aHr10" },
        { field: "aHr11" },
        { field: "aHr12" },
        { field: "totqty" },
        { field: "production11" },
        { field: "production12" },
      ],
    },
    {
      groupId: "internal_data1",
      headerName: "line details",
      description: "",
      renderHeaderGroup: (params) => (
        <span
          style={{ textAlign: "center", width: "inherit", marginRight: "0px" }}
        >
          {params?.headerName}
        </span>
      ),
      children: [
        { field: "cFloor_Descriptin" },
        { field: "aLine" },
        { field: "lMo" },
        { field: "cBuyer_Name" },
        { field: "cStyleNo" },
        { field: "cGmetDis" },
        { field: "pro_smv" },
        { field: "lDayTgt" },
        { field: "htrgt" },
      ],
    },
    {
      groupId: "internal_data2",
      headerName: "defected",
      description: "",
      renderHeaderGroup: (params) => (
        <span
          style={{ textAlign: "center", width: "inherit", marginRight: "0px" }}
        >
          {params?.headerName}
        </span>
      ),
      children: [{ field: "totalDefect" }, { field: "defact1" }],
    },
    {
      groupId: "internal_data3",
      headerName: "dhu",
      description: "",
      renderHeaderGroup: (params) => (
        <span
          style={{ textAlign: "center", width: "inherit", marginRight: "0px" }}
        >
          {params?.headerName}
        </span>
      ),
      children: [
        { field: "totalCheck" },
        { field: "totalDHU" },
        { field: "ddd2" },
      ],
    },
    {
      groupId: "internal_data4",
      headerName: "gap analysis",
      description: "",
      renderHeaderGroup: (params) => (
        <span
          style={{ textAlign: "center", width: "inherit", marginRight: "0px" }}
        >
          {params?.headerName}
        </span>
      ),
      children: [
        { field: "cCmpNallme" },
        { field: "thour" },
        { field: "cCwmpName" },
        { field: "Gap" },
      ],
    },
  ];
  const hourlyProductionView = hourlyProductionData?.map((row, i) => ({
    ...row,
    id: i + 1,
  }));

  // hints data
  const hintsData = [
    {
      color: "#d75353",
      title: "Below achieved",
    },
    { color: "green", title: "Target achieved" },
    { color: "#41ce59", title: "Running Progress" },
    { color: "gray", title: "Not in Progress" },
  ];
  return (
    <>
      <CustomAppBar title={"LIVE-HOURLY PRODUCTION STATUS"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Company"}
              options={companyData ?? []} //company ? yearData ?? [] :
              value={company}
              optionLabel={"cCmpName"}
              optionId={"nCompanyID"}
              loading={isCompanyLoading}
              setSelectedValue={setCompany}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomDatePicker
              label={"Date"}
              name={"date"}
              disableFuture={true}
              value={date}
              setData={setDate}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <span>
              <ReportButton
                title={"Report"}
                type="button"
                fullWidth
                handleClick={handleReport}
                loading={isProductionReportLoading}
                //   disabled={selectedRow.length <= 0 || showApproval}
              />
            </span>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 1, border: "1px dashed grey" }}>
        {hourlyProductionView && <Hints hintsData={hintsData} />}
        <CustomAppBar title={"View"} />
        <CustomTable
          columns={viewColumns}
          rows={hourlyProductionView ?? []}
          toolBar={true}
          groupModel={colGroup}
          loading={isProductionLoading}
          height={hourlyProductionView?.length > 0 ? "auto" : "350px"}

          // checkboxSelection={true}
          // setSelectedRows={setSelectedRows}
          // isSuccess={isSuccess}
        />
      </Box>
      <ReportViewer
        title={"Hourly Production Report"}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </>
  );
};

export default HourlyProductionInput;
