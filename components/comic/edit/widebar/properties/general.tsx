import React from "react";
import {
    TextField,
    Typography,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GeneralProperties: React.FC = () => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="general-prop">
                <Typography fontWeight="bold">General Properties</Typography>
            </AccordionSummary>
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
                <ListItem>
                    <TextField
                        id="y-prop"
                        name="y"
                        label="Y"
                        type="number"
                        variant="outlined"
                        value={0}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="width"
                        name="width"
                        label="Width"
                        type="number"
                        variant="outlined"
                        value={300}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="height"
                        name="height"
                        label="Height"
                        type="number"
                        variant="outlined"
                        value={300}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="rotate-prop"
                        name="rotation"
                        label="Rotation"
                        type="number"
                        variant="outlined"
                        value={0}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Flip X" />
                    <FormControlLabel control={<Checkbox />} label="Flip Y" />
                </ListItem>
            </List>
        </Accordion>
    );
};

export default GeneralProperties;
