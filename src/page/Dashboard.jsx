import { Box, Grid } from "@mui/material";
import AppWebsiteVisits from "../components/DahsBoard/AppWebsiteVisits";
import AppConversionRates from "../components/DahsBoard/AppConversionRates";
import { OverviewTraffic } from "../components/DahsBoard/OverviewTraffic";
import { FaCube, FaCut, FaTshirt } from "react-icons/fa";
import { DashboardCard } from "../components/DahsBoard/DashboardCard";
import { MdInput } from "react-icons/md";
import { AiOutlineExport } from "react-icons/ai";
import { BsBarChartSteps, BsBoxFill, BsGraphUpArrow } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  useGetDashboardBarQuery,
  useGetDashboardPieQuery,
  useGetDashboardStyleQuery,
} from "../redux/features/dashboard/queryDashboard";
import { formateDate } from "../utils/formateDate";
import CardDetails from "../components/sewing/qcBarcode/CardDetails";
import CustomAppBar from "../components/common/CustomAppBar";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  //get style count
  const { data: styleData } = useGetDashboardStyleQuery(user?.companyID);

  //get pie data
  const { data: pieData } = useGetDashboardPieQuery(user?.companyID);
  //get bar and dashboard data
  const { data: barData } = useGetDashboardBarQuery(user?.companyID);

  const barChartData = {
    input: [],
    cutting: [],
    sewing: [],
    finishing: [],
    packing: [],
    export: [],
    months: [],
  };

  barData?.map((e) => {
    barChartData.cutting.push(e.cutQty);
    barChartData.input.push(e.inputQty);
    barChartData.sewing.push(e.sqcQty);
    barChartData.finishing.push(e.finQty);
    barChartData.packing.push(e.pakQty);
    barChartData.export.push(e.expQty);
    barChartData.months.push(formateDate(e.nPrddate));
  });

  const pieChartData = pieData?.map((e) => [
    e.cutQty ?? 0,
    e.inputQty ?? 0,
    e.sqcQty ?? 0,
    e.finQty ?? 0,
    e.pakQty ?? 0,
    e.expQty ?? 0,
  ]);

  const cardItems = [
    {
      title: "TOTAL RUNNING STYLES OF CURRENT MONTH",
      value: styleData ? styleData[0]?.qty ?? 0 : 0,
      // difference: 34,
      icon: <FaCube />,
      isPositive: true,
      iconBgcolor: "#176e2c",
      hoverColor: "rgba(46, 125, 50,.5)",
      borderColor: "rgba(46, 125, 50,.2)",
    },
    {
      title: "TODAY CUTTING",
      value: barData ? barData[barData?.length - 1]?.cutQty ?? 0 : 0,
      difference: 34,
      icon: <FaCut />,
      isPositive: true,
      iconBgcolor: "#d32f2f",
      hoverColor: "rgba(211, 47, 47,.5)",
      borderColor: "rgba(211, 47, 47,.2)",
    },
    {
      title: "TODAY INPUT",
      value: barData ? barData[barData?.length - 1]?.inputQty ?? 0 : 0,

      difference: 34,
      icon: <MdInput />,
      isPositive: true,
      iconBgcolor: "#ed6c02",
      hoverColor: "rgba(255, 108, 2,.5)",
      borderColor: "rgba(255, 108, 2,.2)",
    },
    {
      title: "TODAY SEWING",
      value: barData ? barData[barData?.length - 1]?.sqcQty ?? 0 : 0,

      difference: 34,
      icon: <FaTshirt />,
      isPositive: true,
      iconBgcolor: "#1976d2",
      hoverColor: "rgba(25, 118, 210,.5)",
      borderColor: "rgba(25, 118, 210,.2)",
    },
    {
      title: "Today Finishing",
      value: barData ? barData[barData?.length - 1]?.finQty ?? 0 : 0,

      difference: 34,
      icon: <BsBarChartSteps />,
      isPositive: true,
      iconBgcolor: "#ed6c02",
      hoverColor: "rgba(255, 108, 2,.5)",
      borderColor: "rgba(255, 108, 2,.2)",
    },
    {
      title: "Today Pack",
      value: barData ? barData[barData?.length - 1]?.pakQty ?? 0 : 0,

      difference: 34,
      icon: <BsBoxFill />,
      isPositive: true,
      iconBgcolor: "#1976d2",
      hoverColor: "rgba(25, 118, 210,.5)",
      borderColor: "rgba(25, 118, 210,.2)",
    },
    {
      title: "Today Export",
      value: barData ? barData[barData?.length - 1]?.expQty ?? 0 : 0,

      difference: 34,
      icon: <AiOutlineExport />,
      isPositive: true,
      iconBgcolor: "#176e2c",
      hoverColor: "rgba(46, 125, 50,.5)",
      borderColor: "rgba(46, 125, 50,.2)",
    },
  ];

  const cardArray = [
    {
      title: "Cutting:",
      amount: pieData ? pieData[0]?.cutQty ?? 0 : 0,
      bgColor: "#015568",
      icon: <FaCut style={{ marginTop: "-3px", marginRight: "4px" }} />,
    },
    {
      title: "Input:",
      amount: pieData ? pieData[0]?.inputQty ?? 0 : 0,

      bgColor: "#a50471",
      icon: <MdInput style={{ marginTop: "-3px", marginRight: "4px" }} />,
    },
    {
      title: "Sewing:",
      amount: pieData ? pieData[0]?.sqcQty ?? 0 : 0,

      bgColor: "#01682f",
      icon: <FaTshirt style={{ marginTop: "-3px", marginRight: "4px" }} />,
    },
    {
      title: "Finishing:",
      amount: pieData ? pieData[0]?.finQty ?? 0 : 0,

      bgColor: "#4f0537",
      icon: (
        <BsBarChartSteps style={{ marginTop: "-3px", marginRight: "4px" }} />
      ),
    },
    {
      title: "Pack:",
      amount: pieData ? pieData[0]?.pakQty ?? 0 : 0,

      bgColor: "#56006c",
      icon: <BsBoxFill style={{ marginTop: "-3px", marginRight: "4px" }} />,
    },
    {
      title: "Export:",
      amount: pieData ? pieData[0]?.expQty ?? 0 : 0,

      bgColor: "#05114f",
      icon: (
        <AiOutlineExport style={{ marginTop: "-2px", marginRight: "4px" }} />
      ),
    },
  ];

  return (
    <Grid container>
      {/* Contract Starts  */}
      {cardItems.map((card, i) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} p={0.5} key={i}>
            <DashboardCard
              positive={card.isPositive}
              value={card.value}
              title={card.title}
              difference={card.difference}
              icon={card.icon}
              iconBgcolor={card.iconBgcolor}
              hoverColor={card.hoverColor}
              borderColor={card.borderColor}
            />
          </Grid>
        );
      })}
      {/* Contract Ends  */}

      {/* LC Value By Status Start */}
      <Grid item xs={12} lg={6} p={0.5}>
        <AppWebsiteVisits
          title="Last 15 Days Production Status"
          subheader="(+43%) than last year"
          chartLabels={barChartData?.months}
          chartData={[
            {
              name: "Cutting",
              type: "column",
              fill: "solid",
              data: barChartData?.cutting,
            },
            {
              name: "Input",
              type: "area",
              fill: "gradient",
              data: barChartData?.input,
            },
            {
              name: "Sewing",
              type: "line",
              fill: "solid",
              data: barChartData?.sewing,
            },
            {
              name: "Finishing",
              type: "column",
              fill: "solid",
              data: barChartData?.finishing,
            },
            {
              name: "Packing",
              type: "area",
              fill: "gradient",
              data: barChartData?.packing,
            },
            {
              name: "Export",
              type: "line",
              fill: "solid",
              data: barChartData?.export,
            },
          ]}
        />
      </Grid>
      {/* LC Value By Status End */}

      {/* <Grid item xs={12} sm={6} lg={3} p={0.5}>
        <AppConversionRates
          title="Conversion Rates"
          subheader="(+43%) than last year"
          chartData={[
            { label: "Italy", value: 400 },
            { label: "Japan", value: 430 },
            { label: "China", value: 448 },
            { label: "Canada", value: 470 },
            { label: "France", value: 540 },
            { label: "Germany", value: 580 },
          ]}
        />
      </Grid> */}

      <Grid item xs={12} sm={6} lg={6} p={0.5}>
        <OverviewTraffic
          title="Current Month Total Production Status"
          chartSeries={pieChartData ? pieChartData[0] : []}
          labels={[
            "Cutting",
            "Input",
            "Sewing",
            "Finishing",
            "Packing",
            "Export",
          ]}
        />
      </Grid>
      <Box sx={{ p: 0.5, width: "100%" }}>
        <CustomAppBar title={"CURRENT MONTH TOTAL PRODUCTION STATUS"} />
      </Box>
      <Grid container>
        {cardArray.map((e, i) => (
          <Grid item xs={12} sm={4} md={3} lg={2} p={0.5} key={i}>
            <CardDetails
              title={e.title}
              amount={e.amount}
              icon={e.icon}
              bgColor={e.bgColor}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
