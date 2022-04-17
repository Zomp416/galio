import React from "react";
import {
    Box,
    TextField,
    Typography,
    List,
    ListItem,
    Drawer,
    Toolbar,
    Accordion,
    AccordionSummary,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SketchPicker } from "react-color";

const Properties: React.FC = () => {
    return (
        <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                width: "240px",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: "240px" },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
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
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Flip X"
                            />
                            <FormControlLabel control={<Checkbox />} label="Flip Y" />
                        </ListItem>
                    </List>
                </Accordion>
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
                            <TextField
                                id="fontWeight"
                                value={"bold"}
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
                                value={"normal"}
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
                                    <span style={{ textDecoration: "line-through" }}>
                                        Strike Through
                                    </span>
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
            </Box>
        </Drawer>
    );
};

export default Properties;
