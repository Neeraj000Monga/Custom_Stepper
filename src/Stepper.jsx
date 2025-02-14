import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import { useState } from "react";


const MyStepper = styled(Box)(() => ({
  display: "flex",
  margin: "0% 5%",
  alignItems: "center",
  justifyContent: "center",
}));

const ConnectorCustom = styled(Box)(({ theme, active }) => ({
  height: 2,
  border: 0,
  width: "100%",
  borderRadius: 1,
  backgroundColor: active ? "#fb9714" : "#89a6aa",
  transition: "background-color 0.5s ease-in-out", 
}));

const StepIconCustom = styled(Box)(({ active, isLastActive }) => ({
  width: 22,
  height: 22,
  fontSize: 12,
  color: "white",
  display: "flex",
  minWidth: "22px",
  margin: "0px 10px",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.5s ease-in-out", 
  background: isLastActive ? "#ff5309" : active ? "#ff9d1d" : "#89a6aa",
}));



const StepTitle = styled(Typography)(({ active }) => ({
  width: "130px",
  textAlign: "center",
  fontSize: "0.875rem",
  color: active ? "#ff7539" : "#89a6aa",
  fontWeight: active ? "bold" : "normal",
  transition: "color 0.5s ease-in-out", 
}));

const Label = ["Upload File", "Process File", "Mapping", "Generate", "Submit"];

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextClick = () => {
    if (activeStep < Label.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBackClick = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Box>Step 1: Upload File</Box>;
      case 1:
        return <Box>Step 2: Process File</Box>;
      case 2:
        return <Box>Step 3: Mapping</Box>;
      case 3:
        return <Box>Step 4: Generate</Box>;
      case 4:
        return <Box>Step 5: Submit</Box>;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        paddingTop: "20px",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: "800px", width: "100%" }}>
        <MyStepper>
          {Label.map((_, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", width: index === Label.length - 1 ? "fit-content" : "100%" }}>
              <StepIconCustom
                active={activeStep > index}
                isLastActive={activeStep === index}
                >
                {activeStep > index ? (
                  <CheckIcon sx={{ fontSize: 16 }} />
                ) : (
                  <Typography sx={{ fontSize: "12px" }}>{index + 1}</Typography>
                )}
              </StepIconCustom>
              {index < Label.length - 1 && (
                <ConnectorCustom active={activeStep > index} />
              )}
            </Box>
          ))}
        </MyStepper>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}
        >
          {Label.map((label, index) => (
            <StepTitle key={index} active={activeStep === index}>
              {label}
            </StepTitle>
          ))}
        </Box>

        <Container sx={{ padding: "20px" }}>
          <Card sx={{ width: "100%", minHeight: "150px", p: 2 }}>
            {renderStepContent()}
          </Card>
        </Container>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Go Back" arrow>
            <IconButton onClick={handleBackClick} disabled={activeStep === 0}>
              <ArrowBackIcon
                sx={{ color: activeStep === 0 ? "gray" : "black" }}
              />
            </IconButton>
          </Tooltip>

          <Button
            onClick={handleNextClick}
            disabled={activeStep === Label.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Stepper;
