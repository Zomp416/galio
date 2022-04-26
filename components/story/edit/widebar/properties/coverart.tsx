import { List, ListItem, Input, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useStoryContext } from "../../../../../context/storycontext";
import { createImage, getImage } from "../../../../../util/zilean";

const CoverArtProperties: React.FC = () => {
    const [upload, setUpload] = useState<File>();
    const [uploadDims, setUploadDims] = useState({ width: 100, height: 100 });
    const [imagePreview, setImagePreview] = useState("");
    const [finalImage, setFinalImage] = useState<File>();
    const { story } = useStoryContext();
    const [coverArt, setCoverArt] = useState<string>("");
    useEffect(() => {
        async function getCoverArt() {
            if (story!.coverart !== undefined) {
                const { data } = await getImage(story!.coverart.toString());
                setCoverArt("https://zomp-media.s3.us-east-1.amazonaws.com/" + data.imageURL);
            }
        }
        getCoverArt();
    });

    const doUpload = async () => {
        let form = new FormData();
        form.append("image", upload!);
        form.append("directory", "thumbnails");
        form.append("name", upload!.name.split(".")[0]);
        const { data, error } = await createImage(form);
        if (error) alert(error);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setImagePreview(URL.createObjectURL(event.target.files![0]));
        setFinalImage(event.target.files![0]);
    };

    return (
        <List>
            <ListItem>
                {finalImage === undefined ? (
                    coverArt === "" ? (
                        <div
                            style={{
                                width: "230px",
                                height: "400px",
                                marginLeft: "10px",
                                backgroundColor: "grey",
                            }}
                        ></div>
                    ) : (
                        <img
                            src={coverArt}
                            style={{
                                width: "230px",
                                height: "400px",
                                marginLeft: "10px",
                                objectFit: "cover",
                            }}
                        ></img>
                    )
                ) : (
                    <img
                        src={imagePreview}
                        style={{
                            width: "230px",
                            height: "400px",
                            marginLeft: "10px",
                            objectFit: "cover",
                        }}
                    ></img>
                )}
            </ListItem>
            <ListItem>
                <label htmlFor="contained-button-file">
                    <Input
                        inputProps={{ accept: "image/*" }}
                        name="profilePicture"
                        type="file"
                        id="contained-button-file"
                        style={{ display: "none" }}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" component="span" style={{ marginLeft: "40px" }}>
                        Change Cover Art
                    </Button>
                </label>
            </ListItem>
        </List>
    );
};

export default CoverArtProperties;
