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

const TextProperties: React.FC = () => {
    const { selection } = useEditContext();
    const { newdo } = useComicContext();

    const [text, setText] = useState("i liek taqiutos");
    const [fontSize, setFontSize] = useState(16);
    const [fontWeight, setFontWeight] = useState("normal");
    const [fontStyle, setFontStyle] = useState("normal");
    const [textDecoration, setTextDecoration] = useState("none");
    const [color, setColor] = useState("#000000");

    const onSetText = (e: any) => {
        setText(e.target.value);
        if (selection !== -1) newdo("editLayer", { index: selection, text: e.target.value });
    };

    const onSetFontSize = (e: any) => {
        let size = parseInt(e.target.value);
        if (isNaN(size)) size = 16;
        if (size < 10) size = 10;
        if (size > 1000) size = 999;
        setFontSize(size);
        if (selection !== -1)
            newdo("editLayer", {
                index: selection,
                squish: "fontSize",
                fontSize: size,
            });
    };
    const onSetFontWeight = (e: any) => {
        setFontWeight(e.target.value);
        if (selection !== -1)
            newdo("editLayer", {
                index: selection,
                fontWeight: e.target.value,
            });
    };
    const onSetFontStyle = (e: any) => {
        setFontStyle(e.target.value);
        if (selection !== -1)
            newdo("editLayer", {
                index: selection,
                fontStyle: e.target.value,
            });
    };
    const onSetTextDecoration = (e: any) => {
        setTextDecoration(e.target.value);
        if (selection !== -1)
            newdo("editLayer", {
                index: selection,
                textDecoration: e.target.value,
            });
    };
    const onSetColor = (color_: any) => {
        setColor(color_);
        if (selection !== -1)
            newdo("editLayer", {
                index: selection,
                squish: "color",
                color: `${color_.hex}`,
            });
    };

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
                        value={text}
                        onChange={onSetText}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="fontSize"
                        name="fontSize"
                        label="Font Size"
                        variant="outlined"
                        value={fontSize}
                        onChange={onSetFontSize}
                        fullWidth
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="fontWeight"
                        value={fontWeight}
                        onChange={onSetFontWeight}
                        label="Font Weight"
                        select
                        fullWidth
                    >
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
                    <TextField
                        id="fontStyle"
                        value={fontStyle}
                        onChange={onSetFontStyle}
                        label="Font Style"
                        select
                        fullWidth
                    >
                        <MenuItem value={"normal"}>Normal</MenuItem>
                        <MenuItem value={"italic"}>
                            <span style={{ fontStyle: "italic" }}>Italic</span>
                        </MenuItem>
                    </TextField>
                </ListItem>
                <ListItem>
                    <TextField
                        id="textDecoration"
                        value={textDecoration}
                        onChange={onSetTextDecoration}
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
                    <SketchPicker color={color} onChange={onSetColor} />
                </ListItem>
            </List>
        </Accordion>
    );
};

export default TextProperties;
