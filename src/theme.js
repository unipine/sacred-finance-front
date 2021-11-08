import { createTheme, adaptV4Theme } from "@mui/material/styles";

const Theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: "#EF646D",
    },
    secondary: {
      main: "#EF646D",
    },
    third: {
      main: '#5B5A99',
    }
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "35px",
        minWidth: "300px",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "35px",
      },
    },
    MuiInputBase: {
      root: {
        borderRadius: "35px",
      },
      input: {
        // marginLeft: "10px",
        // marginBottom: "10px",
      },
    },
    MuiFilledInput: {
      root: {
        borderRadius: "35px",
        borderTopLeftRadius: "35px",
        borderTopRightRadius: "35px",
      },
      underline: {
        color: "#fffff",
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "25px",
      },
    },
  },
}));

export default Theme;
