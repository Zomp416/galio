import React, { useState } from "react";
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
import { useEditContext } from "../..";
import { useComicContext } from "../../../../../context/comiccontext";

const PanelProperties: React.FC = () => {
    const { selection } = useEditContext();
    const { newdo } = useComicContext();

    const [borderStyle, setBorderStyle] = useState("solid");
    const [borderWidth, setBorderWidth] = useState(0);
    const [borderRadius, setBorderRadius] = useState(0);

    const onSetBorderWidth = (e: any) => {
        const width = parseInt(e.target.value);
        if (width) setBorderWidth(width > 100 ? 99 : width);
    };
    const onSetBorderRadius = (e: any) => {
        const radius = parseInt(e.target.value);
        if (radius) setBorderRadius(radius > 100 ? 99 : radius);
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="general-prop">
                <Typography fontWeight="bold">Panel Properties</Typography>
            </AccordionSummary>
            <List>
                <ListItem>
                    <TextField
                        id="borderStyle"
                        value={borderStyle}
                        label="Border Style"
                        onChange={e => {
                            setBorderStyle(e.target.value);
                            newdo("editLayer", { index: selection, borderStyle: e.target.value });
                        }}
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
                        variant="outlined"
                        value={borderWidth}
                        onChange={onSetBorderWidth}
                        fullWidth
                        onBlur={() => {
                            if (selection !== -1) {
                                newdo("editLayer", { index: selection, borderWidth });
                            }
                        }}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="borderRadius"
                        name="borderRadius"
                        label="Border Radius"
                        type="number"
                        variant="outlined"
                        value={borderRadius}
                        onChange={onSetBorderRadius}
                        fullWidth
                        onBlur={() => {
                            if (selection !== -1) {
                                newdo("editLayer", { index: selection, borderRadius });
                            }
                        }}
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
