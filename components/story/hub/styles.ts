import styled from "@emotion/styled";

export const MyStoriesOuter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const MyStoriesInner = styled.div`
    width: 100%;
    max-width: calc(80vh + 200px);
    padding-top: 5vh;
    padding-bottom: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CarouselWrapper = styled.div`
    width: 100%;
    height: 400px;
`;

export const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 4vh;
    justify-content: space-between;
`;
