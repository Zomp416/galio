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

const ImageUploadProperties: React.FC = () => {
    const [upload, setUpload] = useState<File>();

    const doUpload = async () => {
        console.log("uploading image");
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="general-prop">
                <Typography fontWeight="bold">ImageUpload</Typography>
            </AccordionSummary>
            <List>
                {upload && (
                    <>
                        <ListItem>
                            <img
                                src={URL.createObjectURL(upload)}
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
