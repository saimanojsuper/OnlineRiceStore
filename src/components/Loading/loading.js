import { CircularProgress, Backdrop } from "@material-ui/core";
import { useState } from "react";

export const Loading = (WrappedComponent) => {
  const NewComponent = (props) => {
    const [isloading, setLoading] = useState(false);
    return isloading ? (
      <>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={isloading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    ) : (
      <WrappedComponent setLoading={setLoading} {...props} />
    );
  };

  return NewComponent;
};
