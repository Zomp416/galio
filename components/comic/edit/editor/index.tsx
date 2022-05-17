/* eslint-disable @next/next/no-img-element */
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
import domtoimage from "dom-to-image";

const Editor: React.FC = () => {
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);
    const { zoom, setZoom, selection, setSelection, setTool, saveComic, publishComic } =
        useEditContext();
    const { layers, undo, redo, newdo, canUndo, canRedo, canSave } = useComicContext();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement).tagName === "INPUT") return;

            if ((e.key === "Backspace" || e.key === "Delete") && selection !== -1) {
                e.preventDefault();
                e.stopPropagation();
                newdo("deleteLayer", { index: selection });
                setSelection!(-1);
                setTool!("");
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
                if (canSave) {
                    handleSaveClick!();
                }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleCloseContext = () => {
        setContextMenu(null);
    };

    const handlePublishClick = async () => {
        const editor = document.getElementById("canvas");
        if (!editor) return;
        setSelection!(-1); // quick fix to not render selection UI
        setZoom!(1); // quick fix to render in correct scale
        const rendered = await domtoimage.toBlob(editor, { cacheBust: true });
        const f = new File([rendered], "filename");
        publishComic!(f);
    };

    const handleSaveClick = async () => {
        const editor = document.getElementById("canvas");
        if (!editor) return;
        setSelection!(-1); // quick fix to not render selection UI
        setZoom!(1); // quick fix to render in correct scale
        const rendered = await domtoimage.toBlob(editor, { cacheBust: true });
        const f = new File([rendered], "filename");
        saveComic!(f);
    };

    const handleZoomIn = () => {
        setZoom!(zoom + 0.25);
    };

    const handleZoomOut = () => {
        if (zoom >= 0.25) {
            setZoom!(zoom - 0.25);
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
                        WebkitTransform: `rotate(${layer.rotation}deg) 
                             scale(${layer.xFlip ? "-1" : "1"}, ${layer.yFlip ? "-1" : "1"})`,
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
                        WebkitTransform: `rotate(${layer.rotation}deg) 
                             scale(${layer.xFlip ? "-1" : "1"}, ${layer.yFlip ? "-1" : "1"})`,
                    }}
                    onContextMenu={handleContextMenu}
                >
                    {layer.properties.text}
                </div>
            );
        } else if (layer.type === "image") {
            return (
                <img
                    src={layer.properties.imageURL!}
                    alt="Image Layer"
                    key={`layer-${layer.name}`}
                    width="100%"
                    height="100%"
                    style={{
                        ...layer.properties,
                        zIndex: index,
                        WebkitTransform: `rotate(${layer.rotation}deg) 
                             scale(${layer.xFlip ? "-1" : "1"}, ${layer.yFlip ? "-1" : "1"})`,
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
                        WebkitTransform: `rotate(${layer.rotation}deg) 
                             scale(${layer.xFlip ? "-1" : "1"}, ${layer.yFlip ? "-1" : "1"})`,
                    }}
                ></div>
            );
        }
    };

    const renderLayer = (layer: Record<any, any>, index: number) => {
        return (
            <Layer layer={layer} index={index} key={`zomp-layer-${index}`} data-key={index}>
                {generateBase(layer, index)}
            </Layer>
        );
    };

    //Styled components are made but doesn't translate 1:1 and you can't used styled component as outer; so just leave it
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
                    <IconButton
                        size="medium"
                        color="inherit"
                        sx={{ mr: 2 }}
                        disabled={!canSave}
                        onClick={handleSaveClick}
                    >
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
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={handleZoomIn}
                    >
                        <ZoomInIcon />
                    </IconButton>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={handleZoomOut}
                    >
                        <ZoomOutIcon />
                    </IconButton>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        disabled={!layers || !layers.length}
                        onClick={handlePublishClick}
                    >
                        PUBLISH
                    </IconButton>
                </Toolbar>
            </div>
            <Styled.EditContainer>
                <div
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
                        padding: "0px",
                        minHeight: "100%",
                        minWidth: "100%",
                    }}
                >
                    {layers.map((val, index) => {
                        if (val.visible) {
                            return renderLayer(val, index);
                        }
                    })}
                    <Menu
                        open={contextMenu !== null}
                        onClose={handleCloseContext}
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
                                    handleCloseContext();
                                    setSelection!(selection + 1);
                                }
                            }}
                        >
                            Duplicate Layer (Ctrl/Cmd + D)
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                if (selection > 0) {
                                    newdo("shiftLayer", { index: selection, dir: "back" });
                                    handleCloseContext();
                                    setSelection!(Math.max(0, selection - 1));
                                }
                            }}
                        >
                            Send Backwards (Ctrl/Cmd + Down)
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                if (selection > 0) {
                                    newdo("shiftLayer", { index: selection, dir: "bottom" });
                                    handleCloseContext();
                                    setSelection!(0);
                                }
                            }}
                        >
                            Send to Bottom (Ctrl/Cmd + Shift + Down)
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                if (selection >= 0 && selection < layers.length - 1) {
                                    newdo("shiftLayer", { index: selection, dir: "forward" });
                                    handleCloseContext();
                                    setSelection!(Math.min(selection + 1, layers.length - 1));
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
                                    handleCloseContext();
                                    setSelection!(layers.length - 1);
                                }
                            }}
                        >
                            Send to Front (Ctrl/Cmd + Shift + Up)
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                newdo("deleteLayer", { index: selection });
                                handleCloseContext();
                                setSelection!(-1);
                                setTool!("");
                            }}
                        >
                            Delete Layer (Delete)
                        </MenuItem>
                    </Menu>
                </div>
            </Styled.EditContainer>
        </div>
    );
};

export default Editor;
