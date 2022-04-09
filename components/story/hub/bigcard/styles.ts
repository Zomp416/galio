import styled from "@emotion/styled";

export const Card = styled.div`
    width: 100%;
    height: 400px;
    max-height: 50vh;
    display: flex;
    background-color: white;
`;

export const Splash = styled.div`
    position: relative;
    flex-shrink: 0;
    width: 400px;
    max-width: 50%;
`;

export const Details = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 20px;
`;

export const DetailsTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const TopLeft = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TopRight = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Views = styled.div`
    height: 15px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
`;

export const ViewEye = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ViewNum = styled.div`
    margin-top: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Image = styled.img`
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
`;
