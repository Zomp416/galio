import styled from "@emotion/styled";

export const Image = styled.img`
    position: relative;
    flex-shrink: 0;
    height: 40px;
    width: 40px;
    object-fit: cover;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const BlankImage = styled.div`
    position: relative;
    flex-shrink: 0;
    height: 40px;
    width: 40px;
    object-fit: cover;
    background-color: grey;
    border: 1px solid black;
`;
