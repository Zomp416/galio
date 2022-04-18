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

import { useToolTabContext } from "..";

const TextProperties: React.FC = () => {
    const { toolTab, setToolTab } = useToolTabContext();

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
                <Typography fontWeight="bold">Text Properties</Typography>
            </AccordionSummary>
            <List>
                <ListItem>
                    <TextField
                        id="text"
                        name="text"
                        label="Text"
                        type="text"
                        variant="outlined"
                        value="Hello World"
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="fontSize"
                        name="fontSize"
                        label="Font Size"
                        type="number"
                        variant="outlined"
                        value="16"
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField id="fontWeight" value={"bold"} label="Font Weight" select fullWidth>
                        <MenuItem value={"bold"}>
                            <span style={{ fontWeight: "bold" }}>Bold</span>
                        </MenuItem>
                        <MenuItem value={"normal"}>Normal</MenuItem>
                        <MenuItem value={"light"}>
                            <span style={{ fontWeight: "lighter" }}>Light</span>
                        </MenuItem>
                    </TextField>
                </ListItem>
                <ListItem>
                    <TextField id="fontStyle" value={"normal"} label="Font Style" select fullWidth>
                        <MenuItem value={"normal"}>Normal</MenuItem>
                        <MenuItem value={"italic"}>
                            <span style={{ fontStyle: "italic" }}>Italic</span>
                        </MenuItem>
                    </TextField>
                </ListItem>
                <ListItem>
                    <TextField
                        id="textDecoration"
                        value={"none"}
                        label="Text Decoration"
                        select
                        fullWidth
                    >
                        <MenuItem value={"none"}>None</MenuItem>
                        <MenuItem value={"underline"}>
                            <span style={{ textDecoration: "underline" }}>Underline</span>
                        </MenuItem>
                        <MenuItem value={"line-through"}>
                            <span style={{ textDecoration: "line-through" }}>Strike Through</span>
                        </MenuItem>
                    </TextField>
                </ListItem>
                <ListItem>
                    <Typography variant="h6">Color: #000000</Typography>
                </ListItem>
                <ListItem sx={{ paddingTop: "0" }}>
                    <SketchPicker color={"000000"} />
                </ListItem>
            </List>
        </Accordion>
    );
};

export default TextProperties;
