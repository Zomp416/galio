import React, { useState } from "react";
import { Button, Typography, IconButton } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import * as Styled from "./styles";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useStoryContext } from "../../../../context/storycontext";

const ReactQuill = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <div>Loading Text Editor...</div>,
});

const Editor: React.FC = () => {
    const [changed, setChanged] = useState<boolean>(false);
    const { story } = useStoryContext();
    return (
        <>
            <Styled.Story>
                <Styled.TitleContainer>
                    <Styled.ButtonContainer>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={() => {
                                setChanged(false);
                            }}
                        >
                            Save {changed && "*"}
                        </Button>
                        <IconButton>
                            <UndoIcon color="primary" />
                        </IconButton>
                        <IconButton>
                            <RedoIcon color="primary" />
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
                </Styled.TitleContainer>
                <ReactQuill
                    defaultValue={story!.story}
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
