import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const LandingPage: React.FC = () => {
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "500px" }}
            >
                <Grid item xs={3}>
                    <Typography align="center" variant="h1">
                        Welcome to Zomp!
                    </Typography>
                    <Typography align="center" variant="h3">
                        A creative platform for everyone
                    </Typography>
                    <Typography align="center">
                        <Button component="a" href="/login" variant="outlined">
                            Login
                        </Button>
                        <Button component="a" href="/register" variant="outlined">
                            Register
                        </Button>
                        {/* TODO: Create dropdown for guest where user can choose comics or stories */}
                        <Button variant="outlined">Continue as Guest</Button>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default LandingPage;
