import styled from "@emotion/styled";
import { Button as MUI_Button } from "@mui/material";

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #39a78e;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 25px;
`;

export const Story = styled.div`
    width: 100%;
    margin: 25px;
`;

export const ChapterButton = styled(MUI_Button)`
    background-color: #bcecdc;
    color: #3f3f3f;
    &:hover {
        background-color: #bcecdc;
    }
`;
