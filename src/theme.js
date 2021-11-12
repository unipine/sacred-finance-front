import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#bdbdbd",
      light: "#bdbdbd",
    },
    secondary: {
      main: "#EF646D",
    },
    third: {
      main: "#5B5A99",
    },
    darkBlack: {
      main: "#000000",
    },
    lightGrey: {
      main: "rgba(0,0,0,0.87)",
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
          textTransform: "none",
          "&.Mui-selected": {
            backgroundColor: "#EF646D",
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
          "&.Mui-selected": {
            backgroundColor: "#EF646D",
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#EF646D",
            color: "#FFFFFF",
            fontWeight: "bold",
          },
          transition: "all 0.5s",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
          color: "rgba(0,0,0,0.87)",
          "&.Mui-selected": {
            backgroundColor: "#EF646D",
            color: "#FFFFFF",
            fontWeight: "bold",
          },
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
