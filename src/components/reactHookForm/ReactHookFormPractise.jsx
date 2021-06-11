import React from 'react';
import {useForm} from 'react-hook-form';

function ReactHookForm () {
    const { register, handleSubmit, formState: { errors }} = useForm();
  
    const onSubmit = (values) => {
        console.log(values)
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="message"
            autoComplete="off"
            {...register("message", {
              required: "Required",
            })}
          />
          <input
          name="password"
          autoComplete="off"
          {...register("password", {
            required: "Required password",
            minLength :8
          })}
        />
          {errors.password && errors.password.message}
          <input type="submit" />
        </form>
      </div>
    );
  }

export default ReactHookForm;
