import styled from "@emotion/styled";

export const ResultCard = styled.div`
    display: flex;
    flex-direction: row;
    height: 100px;
`;

export const CardThumbnailContainer = styled.div`
    width: 90px;
    height: 90px;
    overflow: hidden;
    margin: 5px;
`;

export const CardThumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const CardNoThumbnail = styled.div`
    width: 100%;
    height: 100%;
    background-color: grey;
`;
