import React from "react";
import { Box, Button, Typography } from "@mui/material";

const LandingPage: React.FC = () => {
    return (
        <>
            <Typography
                align="center"
                variant="h1"
                sx={{
                    marginTop: "150px",
                    fontWeight: "bold",
                }}
            >
                Welcome to Zomp!
            </Typography>
            <Typography
                align="center"
                variant="h3"
                sx={{
                    marginBottom: "35px",
                    fontWeight: "bold",
                }}
            >
                A creative platform for everyone
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button
                    component="a"
                    href="/login"
                    variant="outlined"
                    sx={{
                        marginRight: "25px",
                        fontSize: "24px",
                        fontWeight: "bold",
                        height: "65px",
                        width: "160px",
                    }}
                >
                    Sign in
                </Button>
                <Button
                    component="a"
                    href="/register"
                    variant="outlined"
                    sx={{
                        marginLeft: "25px",
                        fontSize: "24px",
                        fontWeight: "bold",
                        height: "65px",
                        width: "160px",
                    }}
                >
                    Sign up
                </Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {/* TODO: Create dropdown for guest where user can choose comics or stories // login user as guest*/}
                <Button
                    component="a"
                    href="/"
                    variant="outlined"
                    sx={{
                        marginTop: "25px",
                        fontSize: "16px",
                        fontWeight: "bolder",
                        height: "50px",
                        width: "200px",
                    }}
                >
                    Continue as Guest
                </Button>
            </Box>
        </>
    );
};

export default LandingPage;
