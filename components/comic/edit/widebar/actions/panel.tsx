import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

import { useComicContext } from "../../../../../context/comiccontext";

const PanelActions: React.FC = () => {
    const { newdo } = useComicContext();

    const doInsertSquare = () => {
        newdo("addLayer", {
            layer: {
                type: "panel",
                name: "Layer 01",
                x: 0,
                y: 0,
                width: 200,
                height: 200,
                rotation: 0,
                xFlip: false,
                yFlip: false,
                visible: true,
                properties: {
                    backgroundColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
                        Math.random() * 255
                    })`,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 0,
                },
            },
        });
    };

    const doInsertCircle = () => {
        newdo("addLayer", {
            layer: {
                type: "panel",
                name: "Layer 01",
                x: 0,
                y: 0,
                width: 200,
                height: 200,
                rotation: 0,
                xFlip: false,
                yFlip: false,
                visible: true,
                properties: {
                    backgroundColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
                        Math.random() * 255
                    })`,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 999,
                },
            },
        });
    };

    return (
        <>
            <Button
                variant="outlined"
                sx={{ marginBottom: "10px" }}
                onClick={doInsertSquare}
                fullWidth
            >
                Square Panel
                <Square />
            </Button>
            <Button
                variant="outlined"
                sx={{ marginBottom: "10px" }}
                onClick={doInsertCircle}
                fullWidth
            >
                Rounded Panel
                <Circle />
            </Button>
        </>
    );
};

const Square = styled.div`
    width: 30px;
    height: 20px;
    margin-left: 10px;
    background-color: gray;
`;

const Circle = styled.div`
    width: 35px;
    height: 20px;
    margin-left: 10px;
    border-radius: 10px;
    background-color: gray;
`;

export default PanelActions;
