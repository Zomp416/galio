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
    background-color: gray;
`;

export const Details = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 20px;
`;

export const DetailsTop = styled.div`
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.div`
    display: flex;
    width: 70%;
`;

export const PublishIcons = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Views = styled.div`
    height: 15px;
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
