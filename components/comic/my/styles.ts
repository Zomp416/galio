import styled from "@emotion/styled";

export const MyComicsOuter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const MyComicsInner = styled.div`
    width: 100%;
    max-width: calc(80vh + 200px);
    padding-top: 2vh;
    padding-bottom: 3vh;
    display: flex;
    flex-direction: column;
`;

export const CarouselWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const GridWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const Grid = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;
