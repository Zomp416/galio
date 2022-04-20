import styled from "@emotion/styled";

import {
    Button,
    ToggleButton as MUI_ToggleButton,
    ToggleButtonGroup as MUI_ToggleButtonGroup,
} from "@mui/material";

export const MyStoriesOuter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
`;

export const MyStoriesInner = styled.div`
    width: 100%;
    max-width: calc(80vh + 200px);
    padding-top: 5vh;
    padding-bottom: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ToggleButton = styled(MUI_ToggleButton)`
    border: none;
`;

export const MyStoriesHeader = styled.div`
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr 0.6fr;
`;

export const ToggleButtonGroup = styled(MUI_ToggleButtonGroup)`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const EditButton = styled(Button)`
    width: 100%;
`;
