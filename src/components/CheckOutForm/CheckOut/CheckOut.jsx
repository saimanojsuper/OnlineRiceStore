import React, { useState } from "react";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import steps from "./config";


const Checkout = ({ cart }) => {

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      city: '',
      zipCode: '',
      shippingSubDivision: '',
      shippingOptions: ''
    }
  });
  const classes = useStyles();

  const CurrentForm = steps[activeStep].component;

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step.name}>
                <StepLabel>{step.name}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            <CurrentForm
              cart={cart}
              formData={formData}
              setFormData={setFormData}
              setActiveStep={setActiveStep}
            />
          </div>
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
