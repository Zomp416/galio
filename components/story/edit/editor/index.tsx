import React, { useState } from "react";
import { Button, Typography, IconButton, TextField } from "@mui/material";
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
    const { chapters, newdo, canSave } = useStoryContext();
    const [changed, setChanged] = useState<boolean>(false);

    const handleSave = async () => {
        setChanged(false);
        saveStory!();
    };
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
                            disabled={!canSave && !changed}
                            onClick={handleSave}
                        >
                            Save {canSave || (changed && "*")}
                        </Button>
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
                {/* vvvvv FIX vvvvv */}
                <ReactQuill
                    value={chapters[selection].text}
                    placeholder="Start Typing..."
                    style={{ marginLeft: "10px", width: "98%", maxWidth: "98%" }}
                    onChange={(content, delta, source, editor) => {
                        if (source === "user") {
                            chapters[selection].text = content;
                            setChanged(true);
                        }
                    }}
                />
            </Styled.Story>
        </>
    );
};

export default Editor;
