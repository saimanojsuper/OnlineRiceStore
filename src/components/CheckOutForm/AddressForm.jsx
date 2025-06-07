import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import countries from "../../api/countries.json";

import FormInput from "./CustomTextField";

const AddressForm = (props) => {

  const { setFormData, setActiveStep } = props;

  const shippingCountries = countries.countries;

  const [shippingCountry, setShippingCountry] = useState(countries.countries[0].id);
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const fetchSubdivisions = async (countryCode) => {
    const subdivisions = countries.countries.filter(
      (item) => item.id === countryCode
    );

    setShippingSubdivisions(subdivisions[0].states);
    setShippingSubdivision(subdivisions[0].states[0].id);
  };

  const fetchShippingOptions = async (country, stateProvince = null) => {

    const subdivisions = countries.countries.filter(
      (item) => item.id === country
    );

    const options = subdivisions[0].states.filter(
      (item) => item.id === stateProvince
    );

    setShippingOptions(options[0].districts);
    setShippingOption(options[0].districts[0].id);
  };

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(shippingCountry, shippingSubdivision);
  }, [shippingCountry, shippingSubdivision]);

  const { control, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    setFormData(prev => ({ ...prev, ...data, shippingCountry, shippingSubdivision, shippingOption }));
    setActiveStep(prev => (prev + 1));
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" control={control} />
            <FormInput required name="lastName" label="Last name" control={control} />
            <FormInput required name="address1" label="Address line 1" control={control} />
            <FormInput required name="email" label="Email" control={control} />
            <FormInput required name="city" label="City" control={control} />
            <FormInput name="zip" label="Zip / Postal code" control={control} />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {shippingCountries.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {shippingSubdivisions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name + "  - " + item.cost}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
