import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#bdbdbd",
      light: "#bdbdbd"
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
          color: "#ffffff"
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
