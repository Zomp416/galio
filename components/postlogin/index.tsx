import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//TODO: replace once we connect to backend
const user = "Mason";

const PostLoginPage: React.FC = () => {
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
                        Hi {user}! What do you want to do today?
                    </Typography>
                    <Typography align="center">
                        <Button  variant="outlined">
                        Create Comics
                        </Button>
                        <Button variant="outlined">
                        Visit Community Hub
                        </Button>
                        <Button  variant="outlined">
                        Create Stories
                        </Button>
                        <Button variant="outlined">
                        Visit Community Hub
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default PostLoginPage;
