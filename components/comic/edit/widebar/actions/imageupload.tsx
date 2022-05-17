/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Button, Dialog, Box, TextField, Chip, IconButton } from "@mui/material";

import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import { useComicContext } from "../../../../../context/comiccontext";
import { useToastContext } from "../../../../../context/toastcontext";
import { createImage } from "../../../../../util/zilean";
import { IMAGE_URI } from "../../../../../util/config";

const Modal: React.FC<{ doClose: () => void }> = props => {
    const [upload, setUpload] = useState<File>();
    const [uploadDims, setUploadDims] = useState<{ width: number; height: number }>();
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [phase, setPhase] = useState(0);
    const { newdo } = useComicContext();
    const { addToast } = useToastContext();

    const doAddTag = (e: any) => {
        e.preventDefault();
        setTags([...tags, newTag]);
        setNewTag("");
    };

    const doUploadAndInsert = async () => {
        let form = new FormData();
        form.append("image", upload!);
        form.append("directory", "assets");
        form.append("name", upload!.name.split(".")[0]);
        tags.forEach(tag => form.append("tags", tag));
        const { data, error } = await createImage(form);
        if (error) {
            addToast("error", error);
            return;
        }
        newdo("addLayer", {
            layer: {
                type: "image",
                name: "Image Layer",
                x: 0,
                y: 0,
                width: uploadDims!.width,
                height: uploadDims!.height,
                rotation: 0,
                xFlip: false,
                yFlip: false,
                visible: true,
                properties: {
                    imageURL: IMAGE_URI + data.imageURL,
                },
            },
        });
        setUpload(undefined);
        props.doClose();
    };

    if (phase === 0) {
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
                    {upload ? (
                        <>
                            <img
                                src={URL.createObjectURL(upload)}
                                alt=""
                                onLoad={e => {
                                    if (!uploadDims) {
                                        console.log(e.currentTarget.width, e.currentTarget.height);
                                        setUploadDims({
                                            width: e.currentTarget.width,
                                            height: e.currentTarget.height,
                                        });
                                    }
                                }}
                                style={{ maxWidth: "100%" }}
                            ></img>
                            <Button variant="outlined" component="label">
                                Choose New Image
                                <input
                                    type="file"
                                    onChange={e => {
                                        setUpload((e.target as HTMLInputElement).files![0]);
                                    }}
                                    hidden
                                />
                            </Button>
                            <Button variant="outlined" onClick={() => setPhase(1)}>
                                Confirm Selection
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{ width: "500px", height: "500px" }}
                        >
                            Choose Image
                            <input
                                type="file"
                                onChange={e => {
                                    setUpload((e.target as HTMLInputElement).files![0]);
                                }}
                                hidden
                            />
                        </Button>
                    )}
                </Box>
            </Dialog>
        );
    } else {
        return (
            <Dialog open={true} onClose={() => props.doClose()}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        minWidth: "500px",
                        padding: "10px",
                        gap: "10px",
                    }}
                >
                    Add some tags (need at least one):
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
                    </Box>
                    <Box component="form" sx={{ position: "relative" }} onSubmit={doAddTag}>
                        <TextField
                            variant="standard"
                            placeholder="new tag"
                            value={newTag}
                            onChange={e => {
                                setNewTag(e.target.value);
                            }}
                        />
                        <IconButton component="button" type="submit" onSubmit={doAddTag}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <>
                        <Button variant="outlined" onClick={() => setPhase(0)}>
                            Back
                        </Button>
                        <Button
                            variant="outlined"
                            disabled={tags.length < 1}
                            onClick={doUploadAndInsert}
                        >
                            Confirm
                        </Button>
                    </>
                </Box>
            </Dialog>
        );
    }
};

const ImageUploadProperties: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button variant="outlined" onClick={() => setModalOpen(true)} fullWidth>
                Upload <UploadIcon />
            </Button>
            {modalOpen && <Modal doClose={() => setModalOpen(false)} />}
        </>
    );
};

export default ImageUploadProperties;
