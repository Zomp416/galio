import styled from "@emotion/styled";
import { Avatar as MUI_Avatar, Button as MUI_Button } from "@mui/material";

export const ViewStoryContainer = styled.div`
    width: 100%;
    padding: 30px 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-top: 25px;
    margin-bottom: 25px;
`;

export const RowContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const ColumnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const TVContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

export const TagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-width: 50%;
    justify-content: left;
    margin-bottom: 5px;
`;

export const ViewContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-width: 50%;
    justify-content: right;
`;

export const Tag = styled(MUI_Button)`
    background-color: white;
    border: 2px solid #39a78e;
    border-radius: 15px;
    height: 30px;
    padding: 3px 10px;
    margin-right: 10px;
`;

export const ManageTag = styled(Tag)`
    color: black;
    background-color: #39a78e;
    border: 2px dashed black;
    font-weight: bold;

    :hover {
        background-color: #2e8c76;
        border: 2px dashed black;
        cursor: pointer;
    }
`;

export const Story = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 25px;
`;

// Author + Share and Subscribe lol
export const ASSContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const AuthorContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Avatar = styled(MUI_Avatar)`
    width: 60px;
    height: 60px;
    margin-right: 5px;
`;

export const SSButton = styled(MUI_Button)`
    padding: 2px 10px;
    margin-left: 5px;
    text-align: center;
    height: 40px;
    line-height: 40px;
`;

export const SSContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-width: 50%;
    justify-content: right;
`;

export const RatingsContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: right;
`;

export const Rating = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;