import styled from "@emotion/styled";
import { Select as MUI_Select } from "@mui/material";

export const GridOptions = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const FloatRight = styled.div`
    position: absolute;
    right: 0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: right;
`;

export const FloatLeft = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: bottom;
    margin-left: 14px;
`;

export const Select = styled(MUI_Select)`
    height: 40px;
    border: none;
    margin-left: 8px;
`;
