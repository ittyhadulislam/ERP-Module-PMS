import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
// components
import { useChart } from '../chart/index';
import React from 'react';

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, chartData, ...other }) {
    const chartLabels = chartData.map((i) => i.label);

    const chartSeries = chartData.map((i) => i.value);

    const chartOptions = useChart({
        tooltip: {
            marker: { show: false },
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: () => '',
                },
            },
        },
        plotOptions: {
            bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
        },
        xaxis: {
            categories: chartLabels,
        },
    });

    return (
        <div style={{ height: '320px' }}>
            <Card {...other} elevation={0} sx={{
                border: '1px solid rgba(20, 125, 226,.2)',
                height: '100%',
                // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                "&:hover": {
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    border: '1px solid rgba(20, 125, 226,.5)',

                }
            }}>
                {/* <CardHeader title={title} subheader={subheader} /> */}
                <span style={{ padding: '20px', fontSize: '25px' }}>{title}</span>

                <Box dir="ltr">
                    <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={285} width={'100%'} />
                </Box>
            </Card>
        </div>
    );
}
