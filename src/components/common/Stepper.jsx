import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import congratsImage from "../../assets/image/congrats.jpeg";
import { Typography } from "@mui/material";
const CustomStepper = ({
  steps = [],
  handleSave = () => {},
  disabled = false,
  handleSubmit,
  activeStep,
  setActiveStep,
}) => {
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (data) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    handleSave(data);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const data = steps[activeStep];
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography
                  sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                >
                  Step {index + 1}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        <form onSubmit={handleSubmit(handleNext)}>
          <Box sx={{ mt: 2, mb: 1 }}>{data?.element}</Box>
          {activeStep >= 6 && (
            <Box>
              <img src={congratsImage} alt="" width={"100%"} />
            </Box>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep >= 6 ? null : (
              <Button type="submit" disabled={disabled}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
          </Box>
        </form>
      </React.Fragment>
    </Box>
  );
};

export default CustomStepper;
