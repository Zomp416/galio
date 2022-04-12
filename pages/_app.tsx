import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    palette: {
        background: {
            default: "#E6F4F1",
        },
        primary: {
            main: "#39A78E",
            contrastText: "#F3F3F3",
        },
        secondary: {
            main: "#3F3F3F",
        },
    },
    typography: {
        fontFamily: ["Overpass", "sans-serif"].join(","),
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
