import React, { useState, useEffect } from "react";
import { Toolbar, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import * as Styled from "./styles";
import Layer from "./layer";
import { useComicContext } from "../../../../context/comiccontext";
import { useEditContext } from "..";

const Editor: React.FC = () => {
    const [zoom, setZoom] = useState<number>(1);
    const { setSelection, setTool } = useEditContext();
    const { layers, undo, redo } = useComicContext();

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const handleKeyPress = (e: KeyboardEvent) => {
        const commandKey = e.ctrlKey || e.metaKey; // Ctrl OR Cmd
        if (!commandKey) return;
        e.preventDefault();

        // Ctrl/Cmd + z (undo)
        if (e.key === "z") {
            console.log("UNDO");
            undo();
        }
        // Ctrl/Cmd + y (redo)
        else if (e.key === "y") {
            console.log("REDO");
            redo();
        }
        // Ctrl/Cmd + d (duplicate)
        else if (e.key === "d") {
            // TODO DUPLICATE SELECTED ELEMENT
            console.log("DUPLICATE");
        }
        // Ctrl/Cmd + s (save)
        else if (e.key === "s") {
            // TODO SAVE COMIC
            console.log("SAVE");
        } else if (e.key === "ArrowUp") {
            // Ctrl/Cmd + Up + Shift (move to front)
            if (e.shiftKey) {
                // TODO MOVE SELECTED LAYER
                console.log("MOVE TO FRONT");
            }
            // Ctrl/Cmd + Up (move up one)
            else {
                // TODO MOVE SELECTED LAYER
                console.log("MOVE UP ONE");
            }
        } else if (e.key === "ArrowDown") {
            // Ctrl/Cmd + Down + Shift (move to bottom)
            if (e.shiftKey) {
                // TODO MOVE SELECTED LAYER
                console.log("MOVE TO BOTTOM");
            }
            // Ctrl/Cmd + Down (move down one)
            else {
                // TODO MOVE SELECTED LAYER
                console.log("MOVE DOWN ONE");
            }
        }
    };

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
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={undo}
                    >
                        <UndoIcon />
                    </IconButton>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={redo}
                    >
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
                    setSelection!(-1);
                    setTool!("");
                }}
                style={{
                    transform: `scale(${zoom})`,
                }}
            >
                {layers.map((val, index) => {
                    if (val.visible) {
                        return renderLayer(val, index);
                    }
                })}
            </Styled.EditContainer>
        </div>
    );
};

export default Editor;
