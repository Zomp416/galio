import styled from "@emotion/styled";
import { Button as MUI_Button } from "@mui/material";

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

export const Image = styled.img`
    flex-shrink: 0;
    width: 210px;
    height: 210px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
`;
