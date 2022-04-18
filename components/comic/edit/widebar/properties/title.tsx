import React from "react";
import { TextField, Typography, List, ListItem } from "@mui/material";

const TitleProperties: React.FC = () => {
    return (
        <>
            <Typography fontWeight="bold">Title/Description</Typography>
            <List>
                <ListItem>
                    <TextField
                        id="name"
                        name="name"
                        label="Layer Name"
                        type="text"
                        variant="outlined"
                        value="Layer 01"
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="x-prop"
                        name="x"
                        label="X"
                        type="number"
                        variant="outlined"
                        value={0}
                        fullWidth
                    />
                </ListItem>
            </List>
        </>
    );
};

export default TitleProperties;
