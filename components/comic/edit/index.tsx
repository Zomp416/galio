import React from "react";
import { Toolbar, IconButton } from "@mui/material";
import Properties from "./properties";
import Actions from "./actions";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import * as Styled from "./styles";

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

const EditComic: React.FC = () => {
    return (
        <Styled.ViewComicContainer>
            <Actions />
            <Styled.EditContainer>
                <div
                    style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Toolbar>
                        <IconButton size="medium" color="inherit" sx={{ mr: 2 }}>
                            <SaveIcon />*
                        </IconButton>
                        <IconButton size="medium" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <UndoIcon />
                        </IconButton>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            disabled
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
                <div
                    style={{
                        margin: "0",
                        padding: "0",
                        position: "relative",
                    }}
                >
                    {testComic.map((val, index) => {
                        if (val.type === "panel") {
                            return (
                                <div
                                    key={`layer-${val.name}`}
                                    style={{
                                        ...val.properties,
                                        zIndex: index,
                                        width: val.width,
                                        height: val.height,
                                        top: val.y,
                                        left: val.x,
                                        position: "absolute",
                                    }}
                                ></div>
                            );
                        } else if (val.type === "text") {
                            return (
                                <p
                                    key={`layer-${val.name}`}
                                    style={{
                                        ...val.properties,
                                        zIndex: index,
                                        width: val.width,
                                        height: val.height,
                                        top: val.y,
                                        left: val.x,
                                        position: "absolute",
                                    }}
                                >
                                    {val.properties.text}
                                </p>
                            );
                        } else if (val.type === "image") {
                            return (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={val.properties.imageURL!}
                                    alt="image-layer"
                                    key={`layer-${val.name}`}
                                    style={{
                                        zIndex: index,
                                        width: val.width,
                                        height: val.height,
                                        top: val.y,
                                        left: val.x,
                                        position: "absolute",
                                    }}
                                />
                            );
                        }
                    })}
                </div>
            </Styled.EditContainer>
            <Properties />
        </Styled.ViewComicContainer>
    );
};

export default EditComic;
