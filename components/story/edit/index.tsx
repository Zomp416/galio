import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/router";
import * as Styled from "./styles";
import "react-quill/dist/quill.snow.css";
import { Snackbar, Alert, Typography } from "@mui/material";
import Editor from "./editor";
import Toolbar from "./toolbar";
import Widebar from "./widebar";
import { useStoryContext } from "../../../context/storycontext";
import {
    saveStory as saveStoryZilean,
    publishStory as publishStoryZilean,
} from "../../../util/zileanStory";

interface IEditContext {
    tool: string;
    setTool?: React.Dispatch<React.SetStateAction<string>>;
    selection: number;
    setSelection?: React.Dispatch<React.SetStateAction<number>>;
    saveStory?: () => Promise<void>;
    publishStory?: () => Promise<void>;
}

const EditContext = createContext<IEditContext>({ tool: "", selection: 0 });

const EditStory: React.FC = () => {
    const router = useRouter();
    const [tool, setTool] = useState("");
    const [open, setOpen] = useState<boolean>(false);
    const [selection, setSelection] = useState(0);
    const { story, chapters, clearHistory } = useStoryContext();

    const saveStory = async () => {
        if (!story || !chapters) return;

        const updatedStory = { ...story };
        updatedStory.story = chapters;
        const res = await saveStoryZilean(updatedStory);
        if (!res.error && res.data) {
            showSaveToast();
            if (clearHistory) clearHistory();
            return;
        } else {
            console.log(res);
        }
    };
    const publishStory = async () => {
        if (!story) return;
        await publishStoryZilean(story._id);
        router.push("/story/my");
    };

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
            <EditContext.Provider
                value={{ tool, setTool, selection, setSelection, saveStory, publishStory }}
            >
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
