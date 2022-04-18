import React from "react";
import { TextField, Typography, List, ListItem, Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useToolTabContext } from "..";

const ImageProperties: React.FC = () => {
    const { toolTab, setToolTab } = useToolTabContext();

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="general-prop">
                <Typography fontWeight="bold">Image Properties</Typography>
            </AccordionSummary>
            <List>
                <ListItem>
                    <TextField
                        id="image-name"
                        name="imageName"
                        label="Image Name"
                        type="text"
                        variant="outlined"
                        value={"Taquito"}
                        fullWidth
                        disabled
                    />
                </ListItem>
            </List>
        </Accordion>
    );
};

export default ImageProperties;
