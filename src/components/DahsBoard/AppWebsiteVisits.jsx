import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { Card, CardHeader, Box } from "@mui/material";
// components
// import { useChart } from '../../../components/chart';
import { useChart } from "../chart/index";
import React from "react";
// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,
  ...other
}) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: "16%" } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y?.toFixed(0)} `;
          }
          return y;
        },
      },
    },
  });

  return (
    <div style={{ height: "320px" }}>
      <Card
        {...other}
        elevation={0}
        sx={{
          border: "1px solid",
          borderImageSlice: 1,
          borderImage: `linear-gradient(to right, rgba(25, 118, 210, .2), rgba(225, 118, 0, .2), rgba(25, 118, 210, .2) ) 1`,
          borderRadius: "5px",
          "&:hover": {
            borderImage: `linear-gradient(to right, rgba(25, 118, 210, .5), rgba(225, 118, 0, .5), rgba(25, 118, 210, .5) ) 1`,
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            // border: '1px solid rgba(25, 118, 210,.5)',
          },
          height: "100%",
        }}
      >
        {/* <CardHeader subheader={subheader} /> */}
        <span style={{ padding: "20px", fontSize: "25px" }}>{title}</span>

        <Box dir="ltr">
          <ReactApexChart
            type="line"
            series={chartData}
            options={chartOptions}
            height={255}
            width={"100%"}
          />
        </Box>
      </Card>
    </div>
  );
}
