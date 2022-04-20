import React, { useState } from "react";
import { Toolbar, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import * as Styled from "./styles";
import Layer from "./layer";

const testComic = [
    {
        type: "panel",
        name: "Layer 01",
        x: 200,
        y: 100,
        width: 500,
        height: 500,
        rotation: 0,
        xFlip: false,
        yFlip: false,
        visible: true,
        properties: {
            backgroundColor: "white",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "black",
            borderRadius: "0px",
        },
    },
    {
        type: "image",
        name: "Layer 02",
        x: 250,
        y: 150,
        width: 300,
        height: 300,
        rotation: 0,
        xFlip: false,
        yFlip: false,
        visible: true,
        properties: {
            imageURL:
                "https://gimmedelicious.com/wp-content/uploads/2019/11/chicken-taquitos-feature-1.jpg",
        },
    },
    {
        type: "text",
        name: "Layer 03",
        x: 250,
        y: 100,
        width: 150,
        height: 30,
        rotation: 0,
        xFlip: false,
        yFlip: false,
        visible: true,
        properties: {
            text: "I Like Taquitos",
            color: "black",
            fontSize: "16px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            justifyContent: "center",
            alignItems: "center",
        },
    },
];

const Editor: React.FC = () => {
    const [selected, setSelected] = useState<number>(-1);
    const [zoom, setZoom] = useState<number>(1);

    const generateBase = (layer: Record<any, any>, index: number) => {
        if (layer.type === "panel") {
            return (
                <div
                    key={`layer-${layer.name}`}
                    style={{
                        ...layer.properties,
                        zIndex: index,
                        width: "100%",
                        height: "100%",
                    }}
                ></div>
            );
        } else if (layer.type === "text") {
            return (
                <div
                    key={`layer-${layer.name}`}
                    style={{
                        ...layer.properties,
                        zIndex: index,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {layer.properties.text}
                </div>
            );
        } else if (layer.type === "image") {
            return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={layer.properties.imageURL!}
                    alt="Image Layer"
                    key={`layer-${layer.name}`}
                    width="100%"
                    height="100%"
                    style={{
                        ...layer.properties,
                        zIndex: index,
                    }}
                />
            );
        } else {
            return (
                <div
                    key={`layer-${layer.name}`}
                    style={{
                        ...layer.properties,
                        zIndex: index,
                    }}
                ></div>
            );
        }
    };

    const renderLayer = (layer: Record<any, any>, index: number) => {
        return (
            <Layer
                layer={layer}
                index={index}
                selected={index === selected}
                setSelected={setSelected}
                key={`zomp-layer-${index}`}
                data-key={index}
                zoom={zoom}
            >
                {generateBase(layer, index)}
            </Layer>
        );
    };

    // TODO MAKE THESE STYLED COMPONENTS, IM LAZY RN
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #39a78d",
                }}
            >
                <Toolbar>
                    <IconButton size="medium" color="inherit" sx={{ mr: 2 }}>
                        <SaveIcon />*
                    </IconButton>
                    <IconButton size="medium" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <UndoIcon />
                    </IconButton>
                    <IconButton size="medium" edge="start" color="inherit" sx={{ mr: 2 }} disabled>
                        <RedoIcon />
                    </IconButton>
                    <IconButton size="medium" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <ZoomInIcon />
                    </IconButton>
                    <IconButton size="medium" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <ZoomOutIcon />
                    </IconButton>
                </Toolbar>
            </div>
            <Styled.EditContainer
                className="editorSpace"
                onMouseDown={e => {
                    console.log("Selected Index: -1");
                    e.preventDefault();
                    setSelected(-1);
                }}
                style={{
                    transform: `scale(${zoom})`,
                }}
            >
                {testComic.map((val, index) => {
                    if (val.visible) {
                        return renderLayer(val, index);
                    }
                })}
            </Styled.EditContainer>
        </div>
    );
};

export default Editor;
