import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#EF646D",
    },
    secondary: {
      main: "#EF646D",
    },
    third: {
      main: "#5B5A99",
    },
  },
  components: {
    
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "35px",
          minWidth: "300px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
        },
        input: {
          // marginLeft: "10px",
          // marginBottom: "10px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
          borderTopLeftRadius: "35px",
          borderTopRightRadius: "35px",
        },
        underline: {
          color: "#fffff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
        },
      },
    },
  },
});

export default Theme;
