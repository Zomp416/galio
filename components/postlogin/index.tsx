import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAuthContext } from "../../context/authcontext";

const PostLoginPage: React.FC = () => {
    const { user } = useAuthContext();

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
                Hi {user ? user.username : "uh oh"}! What do you want to do today?
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
                        href="/comic/hub"
                        variant="outlined"
                        sx={{
                            marginRight: "75px",
                            fontSize: "24px",
                            fontWeight: "bolder",
                            height: "75px",
                            width: "275px",
                        }}
                    >
                        {/* TODO: CONNECT TO COMICS */}
                        Dive Into Comics
                    </Button>
                </Box>
                <Box>
                    <Button
                        component="a"
                        href="/story/hub"
                        variant="outlined"
                        sx={{
                            marginRight: "75px",
                            fontSize: "24px",
                            fontWeight: "bolder",
                            height: "75px",
                            width: "275px",
                        }}
                    >
                        {/* TODO: CONNECT TO STORIES */}
                        Dive Into Stories
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default PostLoginPage;
