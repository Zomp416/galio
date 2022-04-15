import styled from "@emotion/styled";
import { Button as MUI_Button } from "@mui/material";

export const UserContainer = styled.div`
    width: 100%;
    padding: 30px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
`;

export const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`;

export const FilterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-bottom: 10px;
`;

export const TagListContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Tag = styled.div`
    background-color: white;
    border: 2px solid #39a78e;
    border-radius: 15px;
    height: 30px;
    padding: 3px 10px;
    margin-right: 10px;
`;

export const ResultsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const CardsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 40px;
`;

export const ProfilePic = styled.div`
    background-color: grey;
    display: flex;
    flex-direction: column;
    border: 110px solid grey;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
    margin-right: 20px;
`;

export const TextContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-right: 300px;
`;

export const AboutContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;
