import React, { createContext, useState, useContext } from "react";
import * as Styled from "./styles";
import "react-quill/dist/quill.snow.css";
import { Snackbar, Alert, Typography } from "@mui/material";
import Editor from "./editor";
import Toolbar from "./toolbar";
import Widebar from "./widebar";
import { useStoryContext } from "../../../context/storycontext";
import { saveStory as saveStoryZilean } from "../../../util/zilean";

interface IEditContext {
    tool: string;
    setTool?: React.Dispatch<React.SetStateAction<string>>;
    saveStory?: () => Promise<void>;
    publishStory?: (file: File) => Promise<void>;
}

const EditContext = createContext<IEditContext>({ tool: "" });

const EditStory: React.FC = () => {
    const [tool, setTool] = useState("");
    const [open, setOpen] = useState<boolean>(false);
    const { story, clearHistory } = useStoryContext();

    const saveStory = async () => {
        if (!story) return;

        const updatedStory = { ...story };
        const res = await saveStoryZilean(updatedStory);
        if (!res.error && res.data) {
            showSaveToast();
            if (clearHistory) clearHistory();
            return;
        } else {
            console.log(res);
        }
    };
    const publishStory = async () => {};

    const showSaveToast = () => {
        setOpen(true);
    };

    const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <EditContext.Provider value={{ tool, setTool, saveStory, publishStory }}>
                <Styled.EditorOuter>
                    <Styled.EditorInner>
                        <Toolbar />
                        <Widebar />
                        <Editor />
                    </Styled.EditorInner>
                </Styled.EditorOuter>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleCloseToast}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        onClose={handleCloseToast}
                        severity="success"
                        sx={{ width: "100%", backgroundColor: "green", color: "white" }}
                    >
                        <Typography fontWeight="bold">Successfully Saved!</Typography>
                    </Alert>
                </Snackbar>
            </EditContext.Provider>
        </>
    );
};
export const useEditContext = () => useContext(EditContext);

export default EditStory;
