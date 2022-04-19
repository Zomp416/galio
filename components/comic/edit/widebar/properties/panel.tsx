import React from "react";
import {
    TextField,
    Typography,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SketchPicker } from "react-color";

const PanelProperties: React.FC = () => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="general-prop">
                <Typography fontWeight="bold">Panel Properties</Typography>
            </AccordionSummary>
            <List>
                <ListItem>
                    <TextField
                        id="borderStyle"
                        value={"solid"}
                        label="Border Style"
                        select
                        fullWidth
                    >
                        <MenuItem value={"solid"}>
                            {" "}
                            <span style={{ borderStyle: "solid" }}>Solid</span>
                        </MenuItem>
                        <MenuItem value={"none"}>
                            <span style={{ borderStyle: "none" }}>None</span>
                        </MenuItem>
                        <MenuItem value={"dotted"}>
                            <span style={{ borderStyle: "dotted" }}>Dotted</span>
                        </MenuItem>
                        <MenuItem value={"dashed"}>
                            <span style={{ borderStyle: "dashed" }}>Dashed</span>
                        </MenuItem>
                        <MenuItem value={"double"}>
                            <span style={{ borderStyle: "double" }}>Double</span>
                        </MenuItem>
                    </TextField>
                </ListItem>
                <ListItem>
                    <TextField
                        id="borderWidth"
                        name="borderWidth"
                        label="Border Width"
                        type="number"
                        variant="outlined"
                        value={1}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="borderRadius"
                        name="borderRadius"
                        label="Border Radius"
                        type="number"
                        variant="outlined"
                        value={0}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <Typography variant="h6">Border Color: #000000</Typography>
                </ListItem>
                <ListItem sx={{ paddingTop: "0" }}>
                    <SketchPicker color={"000000"} />
                </ListItem>
                <ListItem>
                    <Typography variant="h6">Background Color: #000000</Typography>
                </ListItem>
                <ListItem sx={{ paddingTop: "0" }}>
                    <SketchPicker color={"000000"} />
                </ListItem>
            </List>
        </Accordion>
    );
};

export default PanelProperties;
