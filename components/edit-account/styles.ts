import styled from "@emotion/styled";
import { Button as MUI_Button } from "@mui/material";

export const EditAccountContainer = styled.div`
    width: 100%;
    padding: 30px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    margin-top: 50px;
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

export const SaveButton = styled(MUI_Button)`
    padding: 2px 10px;
    text-align: center;
    height: 40px;
    width: 8%;
    line-height: 40px;
`;

export const ProfilePictureContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    margin-bottom: 25px;
`;
export const AddNewImage = styled.div`
    background-color: grey;
    display: flex;
    flex-direction: column;
    border: 110px solid grey;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
    :hover {
        background-color: grey;
    }
`;

export const PasswordContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    margin-bottom: 25px;
    // border: 1px red solid;
`;

export const ChangePasswordButton = styled(MUI_Button)`
    padding: 2px 10px;
    text-align: center;
    height: 40px;
    width: 30%;
    line-height: 40px;
`;

export const DeleteAccountButton = styled(MUI_Button)`
    padding: 2px 10px;
    text-align: center;
    height: 40px;
    width: 30%;
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
