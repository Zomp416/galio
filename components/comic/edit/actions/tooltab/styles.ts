import styled from "@emotion/styled";

export const Item = styled.div`
    height: 50px;
    width: 50px;
    background-color: white;
`;

export const Highlight = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    border-left: 5px solid #39a78d;
    background-color: #ccc;
    z-index: 2;
`;

export const ToolIcon = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
`;

export const Tooltip = styled.div`
    position: absolute;
    height: 50px;
    padding-left: 60px;
    padding-right: 10px;
    background-color: #39a78d;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;
