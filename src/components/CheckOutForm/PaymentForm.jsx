import React from "react";
import { Typography, Button, Divider, CssBaseline } from "@material-ui/core";

import Review from "./Review";

const PaymentForm = ({
  cart,
  formData,
  setActiveStep
}) => {

  const shippingData = formData;


  return (
    <>
      <CssBaseline />
      <Review cart={cart} shippingData={shippingData} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Button type="submit" variant="outlined" onClick={() => setActiveStep(prev => prev - 1)}>
        Prev
      </Button>
    </>
  );
};

export default PaymentForm;
