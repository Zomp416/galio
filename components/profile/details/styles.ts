import styled from "@emotion/styled";

export const DetailsContainer = styled.div`
    width: 270px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    column-gap: 30px;
`;

export const ProfilePic = styled.div`
    border: 1px solid black;
    flex-shrink: 0;
    width: 250px;
    height: 250px;
    border-radius: 50%;
`;

export const TextContainer = styled.div`
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
`;

export const AboutContainer = styled.div`
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
`;
