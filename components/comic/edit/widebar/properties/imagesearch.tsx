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
import debounce from "lodash.debounce";

const ImageSearchProperties: React.FC = () => {
    const [upload, setUpload] = useState<File>();

    const doDebouncedSearch = debounce(query => {
        console.log("triggered search ", query);
    }, 800);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="general-prop">
                <Typography fontWeight="bold">Image Search</Typography>
            </AccordionSummary>
            <List>
                <ListItem>
                    <TextField
                        label="Search"
                        type="text"
                        variant="outlined"
                        onChange={e => doDebouncedSearch(e.target.value)}
                        fullWidth
                    />
                </ListItem>
            </List>
        </Accordion>
    );
};

export default ImageSearchProperties;
