import React, { useState } from "react";
import * as Styled from "./styles";
import Form from "./form";
import { useRouter } from "next/router";
import { createStory, saveStory, createImage } from "../../../util/zilean";
import { Typography, Input, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const defaultValues = {
    title: "",
    description: "",
};

const CreateNewStory: React.FC = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState(defaultValues);
    const [tags, setTags] = useState<string[]>([]);
    const [addTag, setAddTag] = useState<string>("");
    const [imagePreview, setImagePreview] = useState("");
    const [coverArt, setCoverArt] = useState<File>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImagePreview(URL.createObjectURL(event.target.files![0]));
        setCoverArt(event.target.files![0]);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await createStory();
        const story = data.data;
        if (formValues.title === "") story.title = "Untitled";
        else story.title = formValues.title;
        story.description = formValues.description;
        story.tags = tags;
        if (coverArt !== undefined) {
            let formData = new FormData();
            formData.append("image", coverArt!);
            formData.append("directory", "thumbnails");
            formData.append("name", coverArt!.name.split(".")[0]);
            const { data } = await createImage(formData);
            if (data.error) alert(data.error);
            else story.coverart = data._id;
        }
        if (!data.error) {
            const data = await saveStory(story);
            if (!data.error) {
                router.push({ pathname: "/story/edit/" + data.data._id });
            }
        }
    };

    return (
        <Styled.CreateNewStoryContainer>
            <Styled.ButtonsContainer>
                <Styled.CancelButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        router.back();
                    }}
                >
                    Cancel
                </Styled.CancelButton>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "35px",
                        color: "black",
                    }}
                >
                    Create New Story
                </Typography>
                {/* TODO: read the form and send default data or just delte this page */}
                <Styled.DoneButton variant="contained" color="primary" onClick={handleSubmit}>
                    Done
                </Styled.DoneButton>
            </Styled.ButtonsContainer>
            <Styled.StoryCreatorContainer>
                {imagePreview === "" ? (
                    <Styled.StoryImageContainer>
                        <label htmlFor="contained-button-file">
                            <Input
                                inputProps={{ accept: "image/*" }}
                                name="profilePicture"
                                type="file"
                                id="contained-button-file"
                                style={{ display: "none" }}
                                onChange={handleInputChange}
                            />
                            <EditIcon style={{ marginRight: "10px" }}></EditIcon>
                        </label>
                        <Styled.AddNewImage></Styled.AddNewImage>
                    </Styled.StoryImageContainer>
                ) : (
                    <Styled.StoryImageContainer>
                        <label htmlFor="contained-button-file">
                            <Input
                                inputProps={{ accept: "image/*" }}
                                name="profilePicture"
                                type="file"
                                id="contained-button-file"
                                style={{ display: "none" }}
                                onChange={handleInputChange}
                            />
                            <EditIcon style={{ marginRight: "10px" }}></EditIcon>
                        </label>
                        <Styled.CoverArt src={imagePreview}></Styled.CoverArt>
                    </Styled.StoryImageContainer>
                )}
                <Form
                    formValues={formValues}
                    setFormValues={setFormValues}
                    tags={tags}
                    setTags={setTags}
                    addTag={addTag}
                    setAddTag={setAddTag}
                ></Form>
            </Styled.StoryCreatorContainer>
        </Styled.CreateNewStoryContainer>
    );
};

export default CreateNewStory;
