import styled from "@emotion/styled";

export const SearchContainer = styled.div`
    width: 100%;
    padding: 30px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
`;

export const FilterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-bottom: 50px;
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

export const ManageTag = styled(Tag)`
    background-color: #39a78e;
    border: 2px dashed black;
    font-weight: bold;

    :hover {
        background-color: #2e8c76;
        border: 2px dashed black;
        cursor: pointer;
    }
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
