import React from "react";
import * as Styled from "./styles";
import Form from "./form";
import { useRouter } from "next/router";
import { createStory } from "../../../util/zilean";

const CreateNewStory: React.FC = () => {
    const router = useRouter();

    const handleCreateStory = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await createStory();
        if (!data.error) {
            router.push({ pathname: "/story/edit/" + data.data._id });
        }
    };

    return (
        <Styled.CreateNewStoryContainer>
            <Styled.ButtonsContainer>
                {/* TODO import router to go back to previous page */}
                <Styled.CancelButton variant="contained" color="primary">
                    Cancel
                </Styled.CancelButton>
                {/* TODO: read the form and send default data or just delte this page */}
                <Styled.DoneButton variant="contained" color="primary" onClick={handleCreateStory}>
                    Done
                </Styled.DoneButton>
            </Styled.ButtonsContainer>
            <Styled.StoryCreatorContainer>
                <Styled.StoryImageContainer>
                    <Styled.AddNewImage>Insert Cover Art Here</Styled.AddNewImage>
                </Styled.StoryImageContainer>
                <Form></Form>
            </Styled.StoryCreatorContainer>
        </Styled.CreateNewStoryContainer>
    );
};

export default CreateNewStory;
