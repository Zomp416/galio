import React, { useState } from "react";
import {
    Button,
    TextField,
    Typography,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useComicContext } from "../../../../../context/comiccontext";
import { createImage } from "../../../../../util/zilean";

const ImageUploadProperties: React.FC = () => {
    const [upload, setUpload] = useState<File>();
    const [uploadDims, setUploadDims] = useState({ width: 100, height: 100 });
    const { newdo } = useComicContext();
    console.log(upload);
    const doUpload = async () => {
        let form = new FormData();
        form.append("image", upload!);
        form.append("directory", "assets");
        form.append("name", upload!.name.split(".")[0]);
        const { data, error } = await createImage(form);
        if (error) alert(error);
        newdo("addLayer", {
            layer: {
                type: "image",
                name: "Image Layer",
                x: 0,
                y: 0,
                width: uploadDims.width,
                height: uploadDims.height,
                rotation: 0,
                xFlip: false,
                yFlip: false,
                visible: true,
                properties: {
                    imageURL: "https://zomp-media.s3.us-east-1.amazonaws.com/" + data.imageURL,
                },
            },
        });
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="general-prop">
                <Typography fontWeight="bold">Image Upload</Typography>
            </AccordionSummary>
            <List>
                {upload && (
                    <>
                        <ListItem>
                            <img
                                src={URL.createObjectURL(upload)}
                                onLoad={e =>
                                    setUploadDims({
                                        width: e.currentTarget.width,
                                        height: e.currentTarget.height,
                                    })
                                }
                                style={{ maxWidth: "100%" }}
                            ></img>
                        </ListItem>
                        <ListItem>
                            <TextField label="Name" fullWidth />
                        </ListItem>
                        <ListItem>
                            <Button variant="outlined" onClick={doUpload} fullWidth>
                                Confirm
                            </Button>
                        </ListItem>
                    </>
                )}
                <ListItem>
                    <Button variant="outlined" component="label" fullWidth>
                        Upload
                        <input
                            type="file"
                            onChange={e => {
                                setUpload((e.target as HTMLInputElement).files![0]);
                            }}
                            hidden
                        />
                    </Button>
                </ListItem>
            </List>
        </Accordion>
    );
};

export default ImageUploadProperties;
