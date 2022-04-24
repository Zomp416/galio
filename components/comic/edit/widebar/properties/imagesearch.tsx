import React, { useState } from "react";
import { TextField, Typography, List, ListItem, Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import debounce from "lodash.debounce";
import { searchImage } from "../../../../../util/zilean";

const ImageSearchProperties: React.FC = () => {
    const [results, setResults] = useState([]);

    const doDebouncedSearch = debounce(async query => {
        console.log("triggered search ", query);
        const { data, error } = await searchImage(query);
        if (error) alert(error);
        if (data) setResults(data.map((x: any) => x.imageURL));
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
            <List>
                {results.map(url => (
                    <ListItem>
                        <img
                            src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + url}
                            style={{ maxWidth: "100%" }}
                        ></img>
                    </ListItem>
                ))}
            </List>
        </Accordion>
    );
};

export default ImageSearchProperties;
