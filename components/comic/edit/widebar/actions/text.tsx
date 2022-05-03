import React from "react";
import { Button } from "@mui/material";
import { useComicContext } from "../../../../../context/comiccontext";

const TextActions: React.FC = () => {
    const { newdo } = useComicContext();

    const doInsertText = () => {
        newdo("addLayer", {
            layer: {
                type: "text",
                name: "New Text Layer",
                x: 0,
                y: 0,
                width: 120,
                height: 22,
                rotation: 0,
                xFlip: false,
                yFlip: false,
                visible: true,
                properties: {
                    text: "new text layer",
                    color: "black",
                    fontSize: 16,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textDecoration: "none",
                },
            },
        });
    };

    return (
        <Button variant="outlined" sx={{ marginBottom: "10px" }} onClick={doInsertText} fullWidth>
            Insert Text Layer
        </Button>
    );
};

export default TextActions;
