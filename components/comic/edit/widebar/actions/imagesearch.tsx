/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from "react";
import { TextField, List, ListItem, Button, Dialog, Box, IconButton, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import debounce from "lodash.debounce";
import { searchImage } from "../../../../../util/zilean";
import { useComicContext } from "../../../../../context/comiccontext";

const Modal: React.FC<{ doClose: () => void }> = props => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const { newdo } = useComicContext();

    const doAddTag = (e: any) => {
        e.preventDefault();
        setTags([...tags, newTag]);
        setNewTag("");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const doDebouncedSearch = useCallback(
        debounce(async (query, tags) => {
            console.log("triggered search ", query, tags);
            const { data, error } = await searchImage(query, tags);
            if (error) alert(error);
            if (data) setResults(data.map((x: any) => x.imageURL));
        }, 800),
        []
    );

    useEffect(() => {
        if (query && tags.length >= 0) doDebouncedSearch(query, tags);
    }, [query, tags, doDebouncedSearch]);

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
        props.doClose();
    };
    return (
        <Dialog open={true} onClose={() => props.doClose()}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "500px",
                    padding: "10px",
                    gap: "10px",
                }}
            >
                <TextField
                    label="Search"
                    type="text"
                    variant="outlined"
                    onChange={e => setQuery(e.target.value)}
                    fullWidth
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "8px",
                    }}
                >
                    Tags:
                    {tags.map((val, index) => (
                        <Chip
                            key={`${index}-modal-tag`}
                            label={val}
                            onDelete={() => {
                                setTags(tags.filter(tag => tag !== val));
                            }}
                        ></Chip>
                    ))}
                    <Box component="form" sx={{ position: "relative" }} onSubmit={doAddTag}>
                        <TextField
                            variant="standard"
                            placeholder="new tag"
                            value={newTag}
                            size="small"
                            onChange={e => {
                                setNewTag(e.target.value);
                            }}
                        />
                        <IconButton component="button" type="submit" onSubmit={doAddTag}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        padding: "10px",
                        gridGap: "10px",
                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    }}
                >
                    {results.map((url, i) => (
                        <img
                            key={i}
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
                    ))}
                </Box>
            </Box>
        </Dialog>
    );
};

const ImageSearchProperties: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button variant="outlined" onClick={() => setModalOpen(true)} fullWidth>
                Search <SearchIcon />
            </Button>
            {modalOpen && <Modal doClose={() => setModalOpen(false)} />}
        </>
    );
};

export default ImageSearchProperties;
