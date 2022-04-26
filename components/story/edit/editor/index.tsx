import React, { useEffect, useState } from "react";
import { Button, Typography, IconButton } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import * as Styled from "./styles";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useStoryContext } from "../../../../context/storycontext";
import { useEditContext } from "..";

const ReactQuill = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <div>Loading Text Editor...</div>,
});

const Editor: React.FC = () => {
    const [changed, setChanged] = useState<boolean>(false);
    const { saveStory, publishStory } = useEditContext();
    const { story, undo, redo, newdo, canUndo, canRedo, canSave } = useStoryContext();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
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

            // Ctrl/Cmd + s (save)
            else if (e.key === "s") {
                e.preventDefault();
                if (canSave) {
                    saveStory!();
                }
                console.log("SAVE");
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [undo, redo, newdo]);

    // const handlePublishClick = async () => {
    //     const editor = document.getElementById("canvas");
    //     if (!editor) return;
    //     const rendered = await domtoimage.toBlob(editor);
    //     const f = new File([rendered], "filename");
    //     publishComic!(f);
    // };

    return (
        <>
            <Styled.Story>
                <Styled.TitleContainer>
                    <Styled.ButtonContainer>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            disabled={!canSave}
                            onClick={saveStory}
                        >
                            Save {canSave && "*"}
                        </Button>
                        <IconButton onClick={undo} color="inherit" disabled={!canUndo}>
                            <UndoIcon />
                        </IconButton>
                        <IconButton onClick={redo} color="inherit" disabled={!canRedo}>
                            <RedoIcon />
                        </IconButton>
                    </Styled.ButtonContainer>
                    <Styled.ChapterContainer>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Chapter 1
                            <IconButton>
                                <EditIcon color="primary" />
                            </IconButton>
                        </Typography>
                    </Styled.ChapterContainer>
                    <Button variant="contained" color="primary" style={{ marginLeft: "370px" }}>
                        Publish
                    </Button>
                </Styled.TitleContainer>
                <ReactQuill
                    defaultValue={"asd"}
                    placeholder="Start Typing..."
                    style={{ marginLeft: "10px", width: "98%" }}
                    onChange={(_, __, source) => {
                        if (!changed && source === "user") {
                            setChanged(true);
                        }
                    }}
                />
            </Styled.Story>
        </>
    );
};

export default Editor;
