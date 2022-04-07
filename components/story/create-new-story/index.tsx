import React, { useState } from "react";
// import Link from "next/link";
import * as Styled from "./styles";
import Form from "./form";
import { Input } from "@mui/material";

const CreateNewStory: React.FC = () => {
    return (
        <Styled.CreateNewStoryContainer>
            <Styled.ButtonsContainer>
                <Styled.CancelButton variant="contained" color="primary">
                    Cancel
                </Styled.CancelButton>
                <Styled.DoneButton variant="contained" color="primary">
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
