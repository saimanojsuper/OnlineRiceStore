import { CircularProgress, Backdrop } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const Loading = (WrappedComponent) => {
  const NewComponent = (props) => {
    const classes = useStyles();
    const [isloading, setLoading] = useState(false);

    return (
      <>
        <div data-testid={isloading ? "loading" : "loaded"}>
          <Backdrop className={classes.backdrop} open={isloading}>
            <div>Loading pls wait </div>
            <CircularProgress color="inherit" />
          </Backdrop>
          <WrappedComponent setLoading={setLoading} {...props} />
        </div>
      </>
    );
  };

  return NewComponent;
};
