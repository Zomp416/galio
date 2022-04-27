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
                                {chapters[selection].chapterName}
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
                                        text: chapters[selection].text,
                                    });
                                }}
                                onBlur={e => {
                                    newdo("editChapter", {
                                        index: selection,
                                        chapterName: e.target.value,
                                        text: chapters[selection].text,
                                    });
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
                    value={chapters[selection].text}
                    placeholder="Start Typing..."
                    style={{ marginLeft: "10px", width: "98%" }}
                    onChange={(_, __, source, editor) => {
                        if (source === "user") {
                            newdo("editChapter", {
                                index: selection,
                                chapterName: chapters[selection].chapterName,
                                text: editor.getHTML(),
                            });
                            showTextbox(false);
                        }
                    }}
                />
            </Styled.Story>
        </>
    );
};

export default Editor;
