import React, { useState } from "react";
import {
    Box,
    Divider,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    Toolbar,
    IconButton,
    Accordion,
    AccordionSummary,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import EditIcon from "@mui/icons-material/Edit";
import TagIcon from "@mui/icons-material/Tag";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SquareIcon from "@mui/icons-material/Square";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { SketchPicker } from "react-color";
import * as Styled from "./styles";

const testComic = [
    {
        type: "panel",
        name: "Layer 01",
        x: 200,
        y: 100,
        width: 500,
        height: 500,
        rotation: 0,
        xFlip: false,
        yFlip: false,
        properties: {
            backgroundColor: "white",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "black",
            borderRadius: "0px",
        },
    },
    {
        type: "image",
        name: "Layer 02",
        x: 250,
        y: 150,
        width: 300,
        height: 300,
        rotation: 0,
        xFlip: false,
        yFlip: false,
        properties: {
            imageURL:
                "https://gimmedelicious.com/wp-content/uploads/2019/11/chicken-taquitos-feature-1.jpg",
        },
    },
    {
        type: "text",
        name: "Layer 03",
        x: 250,
        y: 100,
        width: 150,
        height: 30,
        rotation: 0,
        xFlip: false,
        yFlip: false,
        properties: {
            text: "I Like Taquitos",
            color: "black",
            fontSize: "16px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            justifyContent: "center",
            alignItems: "center",
        },
    },
];

const EditComic: React.FC = () => {
    return (
        <Styled.ViewComicContainer>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: "240px",
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: "240px" },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItem key={"comic-title"}>
                            <ListItemText
                                primary={
                                    <Typography variant="h5" width={"100%"} fontWeight="bold">
                                        Comic Title
                                    </Typography>
                                }
                            />
                            <ListItemIcon>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem key={"comic-description"}>
                            <ListItemText primary="Edit Description" />
                            <ListItemIcon>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem key={"manage-tags"}>
                            <ListItemText primary="Manage Tags" />
                            <ListItemIcon>
                                <IconButton>
                                    <TagIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key={"add-panel"}>
                            <ListItemText primary="Add Panel Layer" />
                            <ListItemIcon>
                                <IconButton>
                                    <SquareIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem key={"add-text"}>
                            <ListItemText primary="Add Text Layer" />
                            <ListItemIcon>
                                <IconButton>
                                    <TextFieldsIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem key={"add-asset"}>
                            <ListItemText primary="Add Image Layer" />
                            <ListItemIcon>
                                <IconButton>
                                    <ImageIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                    <Divider />
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography fontWeight="bold">Layers</Typography>
                        </AccordionSummary>
                        <List>
                            {testComic.map((val, index) => {
                                return (
                                    <ListItem button key={`layer-${index}`}>
                                        <ListItemText primary={val.name} />
                                        <ListItemIcon>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Accordion>
                </Box>
            </Drawer>
            <Styled.EditContainer>
                <div
                    style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Toolbar>
                        <IconButton size="medium" color="inherit" sx={{ mr: 2 }}>
                            <SaveIcon />*
                        </IconButton>
                        <IconButton size="medium" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <UndoIcon />
                        </IconButton>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            disabled
                        >
                            <RedoIcon />
                        </IconButton>
                        <IconButton size="medium" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton size="medium" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <ZoomOutIcon />
                        </IconButton>
                    </Toolbar>
                </div>
                <div
                    style={{
                        margin: "0",
                        padding: "0",
                        position: "relative",
                    }}
                >
                    {testComic.map((val, index) => {
                        if (val.type === "panel") {
                            return (
                                <div
                                    key={`layer-${val.name}`}
                                    style={{
                                        ...val.properties,
                                        zIndex: index,
                                        width: val.width,
                                        height: val.height,
                                        top: val.y,
                                        left: val.x,
                                        position: "absolute",
                                    }}
                                ></div>
                            );
                        } else if (val.type === "text") {
                            return (
                                <p
                                    key={`layer-${val.name}`}
                                    style={{
                                        ...val.properties,
                                        zIndex: index,
                                        width: val.width,
                                        height: val.height,
                                        top: val.y,
                                        left: val.x,
                                        position: "absolute",
                                    }}
                                >
                                    {val.properties.text}
                                </p>
                            );
                        } else if (val.type === "image") {
                            return (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={val.properties.imageURL!}
                                    alt="image-layer"
                                    key={`layer-${val.name}`}
                                    style={{
                                        zIndex: index,
                                        width: val.width,
                                        height: val.height,
                                        top: val.y,
                                        left: val.x,
                                        position: "absolute",
                                    }}
                                />
                            );
                        }
                    })}
                </div>
            </Styled.EditContainer>
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
                                        <span style={{ textDecoration: "underline" }}>
                                            Underline
                                        </span>
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
        </Styled.ViewComicContainer>
    );
};

export default EditComic;
