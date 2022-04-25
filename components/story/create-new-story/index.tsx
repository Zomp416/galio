import React, { useState } from "react";
import * as Styled from "./styles";
import Form from "./form";
import { useRouter } from "next/router";
import { createStory, saveStory } from "../../../util/zilean";
import { Typography } from "@mui/material";

const defaultValues = {
    title: "",
    description: "",
};

const CreateNewStory: React.FC = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState(defaultValues);
    const [tags, setTags] = useState<string[]>([]);
    const [addTag, setAddTag] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formValues);
        const data = await createStory();
        const story = data.data;
        story.title = formValues.title;
        story.description = formValues.description;
        story.tags = tags;
        if (!data.error) {
            const data = await saveStory(story);
            if (!data.error) {
                // router.push({ pathname: "/story/edit/" + data.data._id });
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
                <Styled.StoryImageContainer>
                    <Styled.AddNewImage>Insert Cover Art Here</Styled.AddNewImage>
                </Styled.StoryImageContainer>
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
