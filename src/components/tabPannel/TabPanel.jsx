import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

const TabPanel = ({ tabData = [], activeTab = 0, setActiveTab = () => {} }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    setActiveTab(index);
  };
  useEffect(() => {
    setValue(activeTab);
    setActiveTab(activeTab);
  }, [activeTab]);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          border: "1px solid #17a2b8",
          p: 1,
          boxShadow: " 0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
        }}
      >
        <Box
          sx={{
            maxWidth: { sx: 320, sm: "100%" },
            border: "1px solid #17a2b8",
            borderBottom: "none",
            mb: 0.1,
            boxShadow: " 0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
          }}
        >
          <Tabs
            onChange={handleChange}
            value={value}
            // aria-label="Tabs where each tab needs to be selected manually"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            // variant="fullWidth"
          >
            {tabData?.map((tab, i) => (
              <Tab
                onClick={tab?.handleClick}
                label={tab.label}
                key={i}
                sx={{
                  background: value === i && "rgba(25, 118, 210,0.2)",
                  borderRadius: "4px",
                }}
                disabled={tab.disabled || false}
              />
            ))}
          </Tabs>
        </Box>
        <SwipeableViews
          animateTransitions={true}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {tabData?.map((tab, index) => (
            <div key={index} style={{ marginTop: "2px" }}>
              <TabPanelContainer value={value} index={index}>
                {tab.components}
              </TabPanelContainer>
            </div>
          ))}
        </SwipeableViews>
      </Box>
    </Box>
  );
};

export default TabPanel;

function TabPanelContainer(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
