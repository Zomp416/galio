import styled from "@emotion/styled";

export const Widebar = styled.div`
    height: 100%;
    width: 360px;
    background-color: white;
    box-sizing: content-box;
    padding: 10px;
    overflow: scroll;
    border-right: 1px solid #39a78d;
    * {
        -ms-overflow-style: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
`;
