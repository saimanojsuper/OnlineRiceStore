import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";

// import { commerce } from '../../../lib/commerce';
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";

const steps = ["Shipping address", "Payment details", "success"];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  //   const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.noOfitems) {
      const generateToken = async () => {
        try {
          //   const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

          setCheckoutToken(cart);
          console.log("checkout ioken", cart.items);
        } catch {
          //   if (activeStep !== steps.length) history.push('/');
        }
      };
      console.log("checkout ioken", cart);
      generateToken();
    }
  }, [cart]);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  const Confirmation = () => <h1>Confirmation</h1>;

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        setShippingData={setShippingData}
        nextStep={nextStep}
        backStep={backStep}
      />
    );

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
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
