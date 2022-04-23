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
import { useEditContext } from "../..";
import { useComicContext } from "../../../../../context/comiccontext";
import { ILayer } from "../../../../../context/comiccontext/model";

const GeneralProperties: React.FC = () => {
    const { selection } = useEditContext();
    const { newdo, layers } = useComicContext();

    const properties = selection === -1 ? undefined : (layers[selection] as ILayer);

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
                        fullWidth
                        value={properties ? properties.name : "Layer"}
                        onChange={e => {
                            newdo("editLayer", {
                                index: selection,
                                squish: "name",
                                name: e.target.value,
                            });
                        }}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="x-prop"
                        name="x"
                        label="X"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={properties ? properties.x : 0}
                        onChange={e => {
                            newdo("editLayer", {
                                index: selection,
                                squish: "x",
                                x: parseFloat(e.target.value),
                            });
                        }}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="y-prop"
                        name="y"
                        label="Y"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={properties ? properties.y : 0}
                        onChange={e => {
                            newdo("editLayer", {
                                index: selection,
                                squish: "y",
                                y: parseFloat(e.target.value),
                            });
                        }}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="width"
                        name="width"
                        label="Width"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={properties ? properties.width : 0}
                        onChange={e => {
                            newdo("editLayer", {
                                index: selection,
                                squish: "width",
                                width: parseFloat(e.target.value),
                            });
                        }}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="height"
                        name="height"
                        label="Height"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={properties ? properties.height : 0}
                        onChange={e => {
                            newdo("editLayer", {
                                index: selection,
                                squish: "height",
                                height: parseFloat(e.target.value),
                            });
                        }}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id="rotate-prop"
                        name="rotation"
                        label="Rotation"
                        type="number"
                        variant="outlined"
                        value={properties ? properties.rotation : 0}
                        onChange={e => {
                            newdo("editLayer", {
                                index: selection,
                                squish: "rotation",
                                rotation: parseFloat(e.target.value),
                            });
                        }}
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={properties && properties.xFlip}
                                onChange={e => {
                                    newdo("editLayer", {
                                        index: selection,
                                        squish: "xFlip",
                                        xFlip: e.target.checked,
                                    });
                                }}
                            />
                        }
                        label="Flip X"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={properties && properties.yFlip}
                                onChange={e => {
                                    newdo("editLayer", {
                                        index: selection,
                                        squish: "yFlip",
                                        yFlip: e.target.checked,
                                    });
                                }}
                            />
                        }
                        label="Flip Y"
                    />
                </ListItem>
            </List>
        </Accordion>
    );
};

export default GeneralProperties;
