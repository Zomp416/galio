import React from "react";
import {
    Box,
    Divider,
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TagIcon from "@mui/icons-material/Tag";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SquareIcon from "@mui/icons-material/Square";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

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

const Actions: React.FC = () => {
    return (
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
    );
};

export default Actions;
