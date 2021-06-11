import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
//  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
      render={({ field }) => ( 
        <TextField {...field} label={label} required={required} />)}
        
        name={name}
        control={control}
        
        fullWidth
         />
      {/*  as={TextField} label={label} required={required} error={isError} */}
    </Grid>
  );
}

export default FormInput;