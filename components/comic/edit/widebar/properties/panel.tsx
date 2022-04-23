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

    const [borderColor, setBorderColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#000000");

    const onSetBorderStyle = (e: any) => {
        setBorderStyle(e.target.value);
        if (selection !== -1) newdo("editLayer", { index: selection, borderStyle: e.target.value });
    };
    const onSetBorderWidth = (e: any) => {
        let width = parseInt(e.target.value);
        if (isNaN(width)) width = 0;
        if (width > 1000) width = 999;
        setBorderWidth(width);
        if (selection !== -1) newdo("editLayer", { index: selection, borderWidth: width });
    };
    const onSetBorderRadius = (e: any) => {
        let radius = parseInt(e.target.value);
        if (isNaN(radius)) radius = 0;
        if (radius > 1000) radius = 999;
        setBorderRadius(radius);
        if (selection !== -1) newdo("editLayer", { index: selection, borderRadius: radius });
    };
    const onSetBorderColor = (color: any) => {
        setBorderColor(color);
        if (selection !== -1) newdo("editLayer", { index: selection, borderColor: `${color.hex}` });
    };
    const onSetBackgroundColor = (color: any) => {
        setBackgroundColor(color);
        if (selection !== -1)
            newdo("editLayer", { index: selection, backgroundColor: `${color.hex}` });
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
                        onChange={onSetBorderStyle}
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
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="borderRadius"
                        name="borderRadius"
                        label="Border Radius"
                        variant="outlined"
                        value={borderRadius}
                        onChange={onSetBorderRadius}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <Typography variant="h6">Border Color: #000000</Typography>
                </ListItem>
                <ListItem sx={{ paddingTop: "0" }}>
                    <SketchPicker color={borderColor} onChange={onSetBorderColor} />
                </ListItem>
                <ListItem>
                    <Typography variant="h6">Background Color: #000000</Typography>
                </ListItem>
                <ListItem sx={{ paddingTop: "0" }}>
                    <SketchPicker color={backgroundColor} onChange={onSetBackgroundColor} />
                </ListItem>
            </List>
        </Accordion>
    );
};

export default PanelProperties;
