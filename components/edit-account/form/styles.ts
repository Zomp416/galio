import styled from "@emotion/styled";
import { Button as MUI_Button } from "@mui/material";

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 120%;
    justify-content: center;
    margin-bottom: 30px;
`;

export const EditAccountContainer = styled.div`
    width: 100%;
    padding: 30px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    margin-top: 50px;
`;

export const CancelButton = styled(MUI_Button)`
    padding: 2px 10px;
    text-align: center;
    height: 40px;
    width: 8%;
    line-height: 40px;
`;

export const PasswordContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    margin-bottom: 25px;
`;

export const DeleteAccountButton = styled(MUI_Button)`
    padding: 2px 10px;
    text-align: center;
    height: 40px;
    width: 15%;
    margin-right: 10px;
    line-height: 40px;
    background-color: red;
    :hover {
        background-color: red;
    }
`;

export const DialogContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin-bottom: 25px;
`;

export const YesNoButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 500%;
    margin-bottom: 25px;
`;

export const YesButton = styled(MUI_Button)`
    padding: 2px 10px;
    text-align: center;
    height: 40px;
    width: 30%;
    line-height: 40px;
    background-color: red;
    margin-right: 100px;
    :hover {
        background-color: red;
    }
`;
