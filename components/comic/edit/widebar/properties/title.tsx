import React from "react";
import { TextField, List, ListItem } from "@mui/material";

const TitleProperties: React.FC = () => {
    return (
        <List>
            <ListItem>
                <TextField name="name" label="Title" type="text" variant="outlined" fullWidth />
            </ListItem>
            <ListItem>
                <TextField
                    name="name"
                    label="Description"
                    type="text"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={10}
                    maxRows={10}
                />
            </ListItem>
        </List>
    );
};

export default TitleProperties;
