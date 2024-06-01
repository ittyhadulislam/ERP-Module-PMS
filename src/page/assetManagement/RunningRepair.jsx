import { Box } from '@mui/material';
import React, { useState } from 'react';
import RunningRepairInput from '../../components/runningRepair/RunningRepairInput';
import RunningRepairView from '../../components/runningRepair/RunningRepairView';

const RunningRepair = () => {
    const [refetch, setRefetch] = useState(0)

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "#17a2b8",
                p: 1,
                boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
            }}
        >
            <RunningRepairInput setRefetch={setRefetch} />
            <RunningRepairView refetchData={refetch} />
        </Box>
    );
};

export default RunningRepair;