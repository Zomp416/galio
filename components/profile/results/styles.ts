import styled from "@emotion/styled";

export const ResultsContainer = styled.div`
    width: 0px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const TagSortFilterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 10px;
`;

export const TagContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const SortFilterContainer = styled.div`
    align-self: right;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const Tag = styled.div`
    background-color: white;
    border: 2px solid #39a78e;
    border-radius: 15px;
    height: 30px;
    padding: 3px 10px;
    margin-right: 10px;
`;

export const CardsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

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

export const Pagination = styled.div`
    align-self: center;
`;
