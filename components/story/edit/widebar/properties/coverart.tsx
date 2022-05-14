/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import { List, ListItem, Input, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useStoryContext } from "../../../../../context/storycontext";
import { useToastContext } from "../../../../../context/toastcontext";
import { IStory } from "../../../../../context/storycontext/model";
import { createImage } from "../../../../../util/zilean";
import { saveStory } from "../../../../../util/zileanStory";

const CoverArtProperties: React.FC = () => {
    const [uploadDims, setUploadDims] = useState({ width: 100, height: 100 });
    const router = useRouter();
    const { story, chapters, newdo } = useStoryContext();
    const [imagePreview, setImagePreview] = useState("");
    const { addToast } = useToastContext();

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setImagePreview(URL.createObjectURL(event.target.files![0]));
        let form = new FormData();
        form.append("image", event.target.files![0]);
        form.append("directory", "thumbnails");
        form.append("name", event.target.files![0].name.split(".")[0]);
        const { data, error } = await createImage(form);
        if (error) addToast("error", "Error in Setting Cover Art");
        const updatedStory = { ...story };
        updatedStory.coverart = data.imageURL;
        const res = await saveStory!(updatedStory as IStory);
        if (!res.error && res.data) {
            addToast("success", "Updated Cover Art");
        } else {
            addToast("error", "Error in Setting Cover Art");
        }
    };

    return (
        <List>
            <ListItem>
                {story?.coverart === undefined ? (
                    <div
                        style={{
                            width: "230px",
                            height: "400px",
                            marginLeft: "10px",
                            backgroundColor: "grey",
                        }}
                    ></div>
                ) : imagePreview === "" ? (
                    <img
                        src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + story?.coverart}
                        alt=""
                        onLoad={e =>
                            setUploadDims({
                                width: e.currentTarget.width,
                                height: e.currentTarget.height,
                            })
                        }
                        style={{ maxWidth: "100%" }}
                    ></img>
                ) : (
                    <img
                        src={imagePreview}
                        alt=""
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
        </List>
    );
};

export default CoverArtProperties;
