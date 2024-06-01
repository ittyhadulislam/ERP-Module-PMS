import { Box, Grid } from '@mui/material';
import React from 'react';
import ScheduleMaintenanceInput from '../../components/ScheduleMaintenance/ScheduleMaintenanceInput';
import ServiceDescriptionView1 from '../../components/ScheduleMaintenance/ServiceDescriptionView1';
import ServiceDescriptionView2 from '../../components/ScheduleMaintenance/ServiceDescriptionView2';

const ScheduleMaintenance = () => {
    return (
        <Box
            sx={{
                border: 1,
                borderColor: "#17a2b8",
                p: 1,
                boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
            }}
        >
            <ScheduleMaintenanceInput />
            <Grid container>
                <Grid item xs={12} sm={6} md={3}>
                    <ServiceDescriptionView1 />
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                    <ServiceDescriptionView2 />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ScheduleMaintenance;