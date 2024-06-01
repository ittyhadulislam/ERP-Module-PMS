import React, { useState } from "react";
import ReportViewer from "../../components/report/ReportViewer";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomAppBar from "../../components/common/CustomAppBar";
import SelectReport from "../../components/common/SelectReport";
import CustomAutocompleteSmall from "../../components/merchandisingUI/CustomAutocompleteSmall";
import CustomDatePickerSmall from "../../components/merchandisingUI/CustomDatePickerSmall";
import ReportButtonSmall from "../../components/merchandisingUI/ReportButtonSmall";

const Report = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reportType, setReportType] = useState(null);

  //   handleReport fn
  const handleReport = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleReport}>
      <Box
        sx={{
          border: 1,
          borderColor: "#17a2b8",
          p: 1,

          boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <CustomAppBar title={"REPORT LIST"} />
            <Box
              sx={{
                p: 1,
                border: "1px dashed grey",
                borderTop: "none",
                height: "calc(100% - 40px)",
              }}
            >
              <SelectReport
                options={[
                  {
                    value: "Purchase Requisition Details",
                    label: "Purchase Requisition Details",
                  },
                  {
                    value: "Purchase Order Details",
                    label: "Purchase Order Details",
                  },
                  {
                    value: "Purchase Pending Details",
                    label: "Purchase Pending Details",
                  },
                  {
                    value: "Company Wise Purchase Order",
                    label: "Company Wise Purchase Order",
                  },
                  {
                    value: "Item Wise Price History",
                    label: "Item Wise Price History",
                  },
                  {
                    value: "Supplier-Wise Purchase Order Details",
                    label: "Supplier-Wise Purchase Order Details",
                  },
                ]}
                id="reportName"
                title="Report Name"
                setTitle={setTitle}
              />
            </Box>
          </Grid>
          {/* parameter */}
          <Grid item xs={12} sm={6}>
            <CustomAppBar title={"REPORT PARAMETER'S"} />
            <Box
              sx={{
                p: 0.5,
                border: "1px dashed grey",
                borderTop: "none",
                height: "calc(100% - 40px)",
              }}
            >
              <Grid container spacing={1} mt={"0px"}>
                <Grid item xs={12}>
                  <CustomAutocompleteSmall
                    label={"Company"} //company ? yearData ?? [] :
                    optionLabel={"cCmpName"}
                    optionId={"nCompanyID"}
                    options={[]}
                    value={company}
                    setSelectedValue={setCompany}
                    // loading={companyLoading}
                    required={true}
                    // disabled={companyDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDatePickerSmall
                    label={title === "Gate Pass-Daily" ? "Date" : "From Date"}
                    name={"date"}
                    disableFuture={true}
                    //   prevDate={2}
                    //   futureDate={2}
                    value={fromDate}
                    setData={setFromDate}
                    required={true}
                    // disabled={fromDateDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDatePickerSmall
                    label={"To Date"}
                    name={"date"}
                    disableFuture={true}
                    //   prevDate={2}
                    //   futureDate={2}
                    value={toDate}
                    setData={setToDate}
                    required={true}
                    // disabled={toDateDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocompleteSmall
                    label={"Main Category"}
                    options={[]}
                    // value={department}
                    optionLabel={"cDeptname"}
                    optionId={"nUserDept"}
                    // setSelectedValue={setDepartment}
                    // loading={departmentLoading}
                    // required={true}
                    // disabled={departmentDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocompleteSmall
                    label={"Sub Category"}
                    options={[]}
                    // value={department}
                    optionLabel={"cDeptname"}
                    optionId={"nUserDept"}
                    // setSelectedValue={setDepartment}
                    // loading={departmentLoading}
                    // required={true}
                    // disabled={departmentDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocompleteSmall
                    label={"Supplier"}
                    options={[]}
                    // value={department}
                    optionLabel={"cDeptname"}
                    optionId={"nUserDept"}
                    // setSelectedValue={setDepartment}
                    // loading={departmentLoading}
                    // required={true}
                    // disabled={departmentDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocompleteSmall
                    label={"Department"}
                    options={[]}
                    // value={department}
                    optionLabel={"cDeptname"}
                    optionId={"nUserDept"}
                    // setSelectedValue={setDepartment}
                    // loading={departmentLoading}
                    // required={true}
                    // disabled={departmentDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocompleteSmall
                    label={"Section"}
                    options={[]}
                    // value={department}
                    optionLabel={"cDeptname"}
                    optionId={"nUserDept"}
                    // setSelectedValue={setDepartment}
                    // loading={departmentLoading}
                    // required={true}
                    // disabled={departmentDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocompleteSmall
                    // setValue={setValue}
                    label={"Report Type"}
                    options={[
                      { id: 1, name: "PDF" },
                      { id: 2, name: "EXCEL" },
                      { id: 3, name: "WORD" },
                    ]}
                    value={reportType}
                    optionLabel={"name"}
                    optionId={"id"}
                    setSelectedValue={setReportType}
                    // required={true}
                    // disabled={reportTypeDisable}
                  />
                </Grid>

                <Grid item xs={12} mb={1}>
                  <ReportButtonSmall
                    title={"view report"}
                    type="submit"
                    fullWidth
                    // handleClick={handleReport}
                    // loading={
                    //   dailyLoading ||
                    //   dateToDateLoading ||
                    //   returnLoading ||
                    //   dstLoading ||
                    //   styleLoading
                    // }
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ReportViewer
        title={title}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </form>
  );
};

export default Report;
