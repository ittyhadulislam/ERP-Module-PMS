import PropTypes from "prop-types";
import { MdInput } from "react-icons/md";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";

export const OverviewTasksProgress = (props) => {
  const { value } = props;

  return (
    <div style={{ height: "100px" }}>
      <Card
        elevation={0}
        sx={{
          border: "1px solid rgba(255, 108, 2,.2)",
          height: "100%",
          // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            border: "1px solid rgba(255, 108, 2,.5)",
          },
        }}
      >
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={0}>
              <Typography
                color="text.secondary"
                gutterBottom
                variant="overline"
                sx={{ lineHeight: 1.3, letterSpacing: 0 }}
              >
                Today Input
              </Typography>
              <Typography variant="h6">{value}%</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 40,
                width: 40,
              }}
            >
              <SvgIcon>
                <MdInput />
              </SvgIcon>
            </Avatar>
          </Stack>
          <Box sx={{ mt: 0 }}>
            <LinearProgress value={value} variant="determinate" />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
