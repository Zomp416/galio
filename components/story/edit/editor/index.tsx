import React, { useEffect, useState } from "react";
import { Button, Typography, IconButton, TextField } from "@mui/material";
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
    const { saveStory, publishStory, selection } = useEditContext();
    const [textbox, showTextbox] = useState<boolean>(false);
    const { chapters, undo, redo, newdo, canUndo, canRedo, canSave } = useStoryContext();
    const [text, setText] = useState<string>(chapters[selection].text);
    const [chaptername, setChapterName] = useState<string>(chapters[selection].chapterName);
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

    const handlePublishClick = async () => {
        publishStory!();
    };

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
                        {!textbox ? (
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                {chaptername}
                                <IconButton
                                    onClick={e => {
                                        showTextbox(true);
                                    }}
                                >
                                    <EditIcon color="primary" />
                                </IconButton>
                            </Typography>
                        ) : (
                            <TextField
                                name="chaptername"
                                type="text"
                                variant="outlined"
                                defaultValue={chapters[selection].chapterName}
                                onChange={e => {
                                    newdo("editChapter", {
                                        index: selection,
                                        chapterName: e.target.value,
                                        text: text,
                                    });
                                    setChapterName(e.target.value);
                                }}
                                onBlur={e => {
                                    newdo("editChapter", {
                                        index: selection,
                                        chapterName: e.target.value,
                                        text: text,
                                    });
                                    setChapterName(e.target.value);
                                    showTextbox(false);
                                }}
                            />
                        )}
                    </Styled.ChapterContainer>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "13px" }}
                        onClick={handlePublishClick}
                    >
                        Publish
                    </Button>
                </Styled.TitleContainer>
                <ReactQuill
                    defaultValue={text}
                    placeholder="Start Typing..."
                    style={{ marginLeft: "10px", width: "98%" }}
                    onChange={(_, __, source, editor) => {
                        if (source === "user") {
                            newdo("editChapter", {
                                index: selection,
                                chapterName: chaptername,
                                text: editor.getHTML(),
                            });
                            setText(editor.getHTML());
                            showTextbox(false);
                        }
                    }}
                />
            </Styled.Story>
        </>
    );
};

export default Editor;
