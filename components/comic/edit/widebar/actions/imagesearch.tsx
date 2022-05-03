/* eslint-disable @next/next/no-img-element */
//TODO remove that with no warning ^^
import React, { useState } from "react";
import { TextField, Typography, List, ListItem, Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import debounce from "lodash.debounce";
import { searchImage } from "../../../../../util/zilean";
import { useComicContext } from "../../../../../context/comiccontext";

const ImageSearchProperties: React.FC = () => {
    const [results, setResults] = useState([]);
    const { newdo } = useComicContext();

    const doDebouncedSearch = debounce(async query => {
        console.log("triggered search ", query);
        const { data, error } = await searchImage(query);
        if (error) alert(error);
        if (data) setResults(data.map((x: any) => x.imageURL));
    }, 800);

    const doInsertFromSearch = (url: string, width: number, height: number) => {
        newdo("addLayer", {
            layer: {
                type: "image",
                name: "Image Layer",
                x: 0,
                y: 0,
                width,
                height,
                rotation: 0,
                xFlip: false,
                yFlip: false,
                visible: true,
                properties: {
                    imageURL: "https://zomp-media.s3.us-east-1.amazonaws.com/" + url,
                },
            },
        });
    };

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
                {results.map((url, i) => (
                    <ListItem key={i}>
                        <img
                            src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + url}
                            style={{ maxWidth: "100%" }}
                            alt=""
                            onClick={e =>
                                doInsertFromSearch(
                                    url,
                                    e.currentTarget.offsetWidth,
                                    e.currentTarget.offsetHeight
                                )
                            }
                        ></img>
                    </ListItem>
                ))}
            </List>
        </Accordion>
    );
};

export default ImageSearchProperties;
