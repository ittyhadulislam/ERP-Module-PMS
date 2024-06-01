import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import { FaTags } from "react-icons/fa";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";

export const OverviewTotalCustomers = ({
  difference,
  positive = false,
  value,
  title,
  icon,
  iconBgcolor,
  hoverColor,
  borderColor,
}) => {
  //   const = props;

  return (
    <div style={{ height: "100px" }}>
      <Card
        elevation={0}
        sx={{
          border: `1px solid ${borderColor}`,
          height: "100%",
          // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            border: `1px solid ${hoverColor}`,
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
                variant="overline"
                sx={{ lineHeight: 1.3, letterSpacing: 0 }}
              >
                {title}
              </Typography>
              <Typography variant="h6">{value}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: iconBgcolor,
                height: 40,
                width: 40,
              }}
            >
              <SvgIcon>{icon}</SvgIcon>
            </Avatar>
          </Stack>
          {difference && (
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              // sx={{ mt: 2 }}
            >
              <Stack alignItems="center" direction="row" spacing={0.5}>
                <SvgIcon
                  color={positive ? "success" : "error"}
                  fontSize="small"
                >
                  {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </SvgIcon>
                <Typography
                  color={positive ? "success.main" : "error.main"}
                  variant="body2"
                >
                  {difference}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Since last month
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
