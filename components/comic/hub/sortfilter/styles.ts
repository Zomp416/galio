import styled from "@emotion/styled";
import { ToggleButton as MUI_ToggleButton, Select as MUI_Select } from "@mui/material";

export const SortFilter = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
export const Filter = styled.div`
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Select = styled(MUI_Select)`
    height: 40px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
    margin-left: 8px;
    padding-top: 1px;
`;

export const ToggleButton = styled(MUI_ToggleButton)`
    border: none;
`;
