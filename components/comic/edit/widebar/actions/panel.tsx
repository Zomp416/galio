import React from "react";
import styled from "@emotion/styled";

import { useComicContext } from "../../../../../context/comiccontext";

const PanelActions: React.FC = () => {
    const { newdo } = useComicContext();

    const addPanel = () => {
        newdo("addLayer", {
            layer: {
                type: "panel",
                name: "Layer 01",
                x: Math.random() * 400,
                y: Math.random() * 400,
                width: Math.random() * 400,
                height: Math.random() * 400,
                rotation: 0,
                xFlip: false,
                yFlip: false,
                visible: true,
                properties: {
                    backgroundColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
                        Math.random() * 255
                    })`,
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "black",
                    borderRadius: "0px",
                },
            },
        });
    };

    return (
        <Options>
            <ButtonBox>
                <Square onClick={addPanel} />
            </ButtonBox>
            <ButtonBox>
                <Circle />
            </ButtonBox>
        </Options>
    );
};

const Options = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gridgap: 20px;
    margin-bottom: 20px;
`;

const Square = styled.div`
    width: 80px;
    height: 80px;
    background-color: gray;
    &:hover {
        width: 90px;
        height: 90px;
        cursor: pointer;
    }
`;

const Circle = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: gray;
    &:hover {
        width: 90px;
        height: 90px;
        cursor: pointer;
    }
`;

const ButtonBox = styled.div`
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default PanelActions;
