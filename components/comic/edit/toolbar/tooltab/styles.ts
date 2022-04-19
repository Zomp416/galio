import styled from "@emotion/styled";

export const Item = styled.div`
    height: 40px;
    width: 40px;
`;

export const Highlight = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-left: 5px solid #39a78d;
    background-color: #ccc;
    z-index: 20;
`;

export const ToolIcon = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 30;
`;

export const Tooltip = styled.div`
    position: absolute;
    height: 40px;
    padding-left: 45px;
    padding-right: 7px;
    background-color: #39a78d;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;
