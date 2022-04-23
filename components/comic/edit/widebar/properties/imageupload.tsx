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
import { createImage } from "../../../../../util/zilean";

const ImageUploadProperties: React.FC = () => {
    const [upload, setUpload] = useState<File>();

    const doUpload = async () => {
        let form = new FormData();
        form.append("image", upload!);
        form.append("directory", "assets");
        form.append("name", upload!.name.split(".")[0]);
        const { data, error } = await createImage(form);
        if (error) alert(error);
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
