import PropTypes from "prop-types";
import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import DeviceTabletIcon from "@heroicons/react/24/solid/DeviceTabletIcon";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";

import Chart from "react-apexcharts";
import React from "react";
import { Padding } from "@mui/icons-material";

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [
      // theme.palette.primary.main,
      // theme.palette.success.main,
      // theme.palette.warning.main,
      // theme.palette.error.main,
      // theme.palette.grey,
    ],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: true,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

export const OverviewTraffic = (props) => {
  const { chartSeries, labels, title } = props;
  const chartOptions = useChartOptions(labels);

  const options = {
    // series: [],
    chart: {
      width: 380,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    labels: labels,
    // colors: ["#000000"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "top",
      offsetY: 0,
      // height: 230,
    },
  };

  return (
    <div style={{ height: "320px" }}>
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderImageSlice: 1,
          height: "100%",
          borderImage: `linear-gradient(to right, rgba(20, 125, 226,.2), rgba(237, 108, 2,.2), rgba(46, 125, 50,.2) ) 1`,
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            borderImage: `linear-gradient(to right, rgba(20, 125, 226,.5), rgba(237, 108, 2,.5), rgba(46, 125, 50,.5) ) 1`,
          },
        }}
      >
        {/* <CardHeader subheader={'header title'} /> */}
        <span
          style={{ padding: "18px", fontSize: "16px", marginBottom: "10px" }}
        >
          {title}
        </span>

        <CardContent sx={{ height: "100%" }}>
          <Chart
            height={"100%"}
            options={options}
            series={chartSeries}
            type="donut"
            width="100%"
          />
        </CardContent>
      </Card>
    </div>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
