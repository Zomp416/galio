import React, { useState, useEffect } from "react";
import { Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
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
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);
    const { selection, setSelection, setTool } = useEditContext();
    const { layers, undo, redo, newdo, canUndo, canRedo, canSave } = useComicContext();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement).tagName === "INPUT") return;

            if ((e.key === "Backspace" || e.key === "Delete") && selection !== -1) {
                e.preventDefault();
                e.stopPropagation();
                newdo("deleteLayer", { index: selection });
                console.log(`DELETE LAYER ${selection}`);
                return;
            }

            const commandKey = e.ctrlKey || e.metaKey; // Ctrl OR Cmd
            if (!commandKey) return;

            // Ctrl/Cmd + z (undo)
            if (e.key === "z") {
                e.preventDefault();
                undo();
                console.log("UNDO");
            }
            // Ctrl/Cmd + y (redo)
            else if (e.key === "y") {
                e.preventDefault();
                console.log("REDO");
                redo();
            }
            // Ctrl/Cmd + d (duplicate)
            else if (e.key === "d") {
                e.preventDefault();
                if (selection >= 0) {
                    console.log("DUPLICATE");
                    const newLayer = { ...layers[selection] };
                    newLayer.x += 15;
                    newLayer.y += 15;
                    newdo("addLayer", { layer: newLayer });
                }
            }
            // Ctrl/Cmd + s (save)
            else if (e.key === "s") {
                e.preventDefault();
                // TODO SAVE COMIC
                console.log("SAVE");
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                // Ctrl/Cmd + Up + Shift (move to front)
                if (e.shiftKey) {
                    if (selection >= 0 && selection < layers.length - 1) {
                        console.log("MOVE TO FRONT");
                        newdo("shiftLayer", { index: selection, dir: "top" });
                    }
                }
                // Ctrl/Cmd + Up (move up one)
                else {
                    if (selection >= 0 && selection < layers.length - 1) {
                        console.log("MOVE UP ONE");
                        newdo("shiftLayer", { index: selection, dir: "top" });
                    }
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                // Ctrl/Cmd + Down + Shift (move to bottom)
                if (e.shiftKey) {
                    if (selection > 0) {
                        console.log("MOVE TO BOTTOM");
                        newdo("shiftLayer", { index: selection, dir: "bottom" });
                    }
                }
                // Ctrl/Cmd + Down (move down one)
                else {
                    if (selection > 0) {
                        console.log("MOVE DOWN ONE");
                        newdo("shiftLayer", { index: selection, dir: "back" });
                    }
                }
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [undo, redo, newdo, selection]);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX - 2,
                      mouseY: event.clientY - 4,
                  }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                  // Other native context menus might behave different.
                  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                  null
        );
    };

    const handleClose = () => {
        setContextMenu(null);
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
                    onContextMenu={handleContextMenu}
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
                    onContextMenu={handleContextMenu}
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
                    onContextMenu={handleContextMenu}
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
                    <IconButton size="medium" color="inherit" sx={{ mr: 2 }} disabled={!canSave}>
                        <SaveIcon /> {canSave && "*"}
                    </IconButton>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={undo}
                        disabled={!canUndo}
                    >
                        <UndoIcon />
                    </IconButton>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={redo}
                        disabled={!canRedo}
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
                id="canvas"
                onMouseDown={e => {
                    const name = (e.target as HTMLElement).className;
                    if (name && name.includes("editorSpace")) {
                        console.log("Selected Index: -1");
                        e.preventDefault();
                        setSelection!(-1);
                        setTool!("");
                    }
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
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem
                        onClick={() => {
                            if (selection >= 0) {
                                const newLayer = { ...layers[selection] };
                                newLayer.x += 15;
                                newLayer.y += 15;
                                newdo("addLayer", { layer: newLayer });
                                handleClose();
                            }
                        }}
                    >
                        Duplicate Layer (Ctrl/Cmd + D)
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            if (selection > 0) {
                                newdo("shiftLayer", { index: selection, dir: "back" });
                                handleClose();
                            }
                        }}
                    >
                        Send Backwards (Ctrl/Cmd + Down)
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            if (selection > 0) {
                                newdo("shiftLayer", { index: selection, dir: "bottom" });
                                handleClose();
                            }
                        }}
                    >
                        Send to Bottom (Ctrl/Cmd + Shift + Down)
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            if (selection >= 0 && selection < layers.length - 1) {
                                newdo("shiftLayer", { index: selection, dir: "forward" });
                                handleClose();
                            }
                        }}
                    >
                        Send Forwards (Ctrl/Cmd + Up)
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            if (selection >= 0 && selection < layers.length - 1) {
                                console.log(`Shifting Index ${selection}`);
                                newdo("shiftLayer", { index: selection, dir: "top" });
                                handleClose();
                            }
                        }}
                    >
                        Send to Front (Ctrl/Cmd + Shift + Up)
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            newdo("deleteLayer", { index: selection });
                            handleClose();
                        }}
                    >
                        Delete Layer (Delete)
                    </MenuItem>
                </Menu>
            </Styled.EditContainer>
        </div>
    );
};

export default Editor;
