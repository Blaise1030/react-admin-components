import { ThemeOptions } from "@mui/material";

const theme: ThemeOptions = {
  palette: {
    background: {
      default: "#f5f6fa",
    },
    primary: {
      main: "#09243f",
    },
    secondary: {
      main: "#edecf2",
    },
  },
  typography: {
    fontFamily: "DM Sans",
  },
  components: {
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
        hover: {
          backgroundColor: "blue",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "8px solid #f5f6fa",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        outlined: {
          backgroundColor: "white",
          boxShadow: "initial",
        },
        root: {
          textTransform: "none",
          fontWeight: "400",
        },
      },
    },
  },
};

export { theme };
