import { List, ListItem, Input, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useStoryContext } from "../../../../../context/storycontext";
import { createImage, getImage } from "../../../../../util/zilean";

const CoverArtProperties: React.FC = () => {
    const [imagePreview, setImagePreview] = useState("");
    const [finalImage, setFinalImage] = useState<File>();
    const [uploadDims, setUploadDims] = useState({ width: 100, height: 100 });
    const { story, newdo } = useStoryContext();
    const [coverArt, setCoverArt] = useState<string>("");
    useEffect(() => {
        async function getCoverArt() {
            if (story!.coverart !== undefined) {
                const { data, error } = await getImage(story!.coverart.toString());
                if (error) alert(error);
                else setCoverArt("https://zomp-media.s3.us-east-1.amazonaws.com/" + data.imageURL);
            }
        }
        getCoverArt();
    });

    const doUpload = async () => {
        let form = new FormData();
        form.append("image", finalImage!);
        form.append("directory", "thumbnails");
        form.append("name", finalImage!.name.split(".")[0]);
        const { data, error } = await createImage(form);
        if (error) alert(error);
        newdo("editStory", { coverart: data._id });
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
                            onLoad={e =>
                                setUploadDims({
                                    width: e.currentTarget.width,
                                    height: e.currentTarget.height,
                                })
                            }
                            style={{ maxWidth: "100%" }}
                        ></img>
                    )
                ) : (
                    <img
                        src={imagePreview}
                        onLoad={e =>
                            setUploadDims({
                                width: e.currentTarget.width,
                                height: e.currentTarget.height,
                            })
                        }
                        style={{ maxWidth: "100%" }}
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
                    <Button variant="outlined" component="span" style={{ width: "284%" }}>
                        Upload
                    </Button>
                </label>
            </ListItem>
            <ListItem>
                {finalImage && (
                    <Button variant="outlined" onClick={doUpload} fullWidth>
                        Set as Cover Art
                    </Button>
                )}
            </ListItem>
        </List>
    );
};

export default CoverArtProperties;
