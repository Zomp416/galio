import styled from "@emotion/styled";

export const Card = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
`;

export const CardHover = styled.div`
    position: absolute;
    z-index: 5;
    width: 150px;
    height: 150px;
    opacity: 0.7;
    background-color: rgba(255, 255, 255, 0.8);
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

export const Image = styled.img`
    position: absolute;
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
`;
