import styled from "@emotion/styled";
import { Button as MUI_Button } from "@mui/material";

export const ViewComicContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 50px;
`;

export const EditContainer = styled.div`
    flex: 1;
    padding: 0px;
    height: 100%;
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
    margin-right: 5px;a
`;

export const ComicImage = styled.div`
    width: 100%;
    height: 620px;
    background-color: grey;
`;
