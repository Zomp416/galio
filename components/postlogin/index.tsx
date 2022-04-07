import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//TODO: replace once we connect to backend
const user = "Mason";

const PostLoginPage: React.FC = () => {
    return (
        <>
            <Typography
                align="center"
                variant="h2"
                sx={{
                    marginTop: "150px",
                    marginBottom: "35px",
                    fontWeight: "bolder",
                }}
            >
                Hi {user}! What do you want to do today?
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box>
                    <Button
                        component="a"
                        href="/"
                        variant="outlined"
                        sx={{
                            marginRight: "75px",
                            fontSize: "24px",
                            fontWeight: "bolder",
                            height: "75px",
                            width: "275px",
                        }}
                    >
                        Dive Into Comics
                    </Button>
                </Box>
                <Box>
                    <Button
                        component="a"
                        href="/"
                        variant="outlined"
                        sx={{
                            marginRight: "75px",
                            fontSize: "24px",
                            fontWeight: "bolder",
                            height: "75px",
                            width: "275px",
                        }}
                    >
                        Dive Into Stories
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default PostLoginPage;
