import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize primary color
    },
    secondary: {
      main: "#dc004e", // Customize secondary color
    },
    background: {
      default: "#f4f6f8", // Customize default background color
    },
    text: {
      primary: "#333333", // Customize primary text color
      secondary: "#555555", // Customize secondary text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    // Customize other typography variants as needed
  },
});

export default theme;
