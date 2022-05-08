import styled from "@emotion/styled";
import { Avatar as MUI_Avatar, Button as MUI_Button } from "@mui/material";

export const ViewComicContainer = styled.div`
    width: 100%;
    padding: 30px 27.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    margin-top: 50px;
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
    margin-right: 5px;
`;

export const ComicImage = styled.img`
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const NoComicImage = styled.div`
    width: 100%;
    height: 620px;
    background-color: grey;
`;

// Author + Share and Subscribe lol
export const ASSContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
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
    width: 50%;
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
