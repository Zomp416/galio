import styled from "@emotion/styled";
import { Button as MUI_Button } from "@mui/material";

export const CreateNewStoryContainer = styled.div`
    width: 100%;
    padding: 30px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 120%;
    justify-content: space-between;
    margin-bottom: 30px;
`;

export const CancelButton = styled(MUI_Button)`
    padding: 2px 10px;
    text-align: center;
    height: 40px;
    width: 8%;
    line-height: 40px;
`;

export const DoneButton = styled(MUI_Button)`
    padding: 2px 10px;
    text-align: center;
    height: 40px;
    width: 8%;
    line-height: 40px;
`;

export const StoryCreatorContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 120%;
`;

export const StoryImageContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: right;
    margin-right: 30px;
`;

export const AddNewImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
    margin-right: 20px;
    height: 500px;
    background-color: grey;
    font-weight: bold;
    color: black;
    :hover {
        background-color: grey;
    }
`;

export const CoverArt = styled.img`
    flex-shrink: 0;
    width: 350px;
    height: 500px;
    object-fit: cover;
    margin-right: 20px;
`;

export const StoryDetailsForm = styled.form`
    width: 90%;
    height: 250px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

export const TagContainer = styled.div`
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-bottom: 50px;
`;

export const TagListContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Tag = styled.div`
    background-color: white;
    border: 2px solid #39a78e;
    border-radius: 15px;
    height: 30px;
    padding: 3px 10px;
    margin-right: 10px;
`;

export const ManageTag = styled(Tag)`
    background-color: #39a78e;
    border: 2px dashed black;
    font-weight: bold;

    :hover {
        background-color: #2e8c76;
        border: 2px dashed black;
        cursor: pointer;
    }
`;
