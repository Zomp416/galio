import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert, Typography } from "@mui/material";
import Toolbar from "./toolbar";
import Widebar from "./widebar";
import Editor from "./editor";
import { useComicContext } from "../../../context/comiccontext";
import * as Styled from "./styles";
import { saveComic as saveComicZilean } from "../../../util/zilean";

interface IEditContext {
    tool: string;
    setTool?: React.Dispatch<React.SetStateAction<string>>;
    selection: number;
    setSelection?: React.Dispatch<React.SetStateAction<number>>;
    saveComic?: () => Promise<void>;
}

const EditContext = createContext<IEditContext>({ tool: "", selection: -1 });

const EditComic: React.FC = () => {
    const [tool, setTool] = useState("");
    const [selection, setSelection] = useState(-1);
    const [open, setOpen] = useState<boolean>(false);
    const { comic, layers, clearHistory } = useComicContext();

    const saveComic = async () => {
        if (!comic || !layers) return;

        const updatedComic = { ...comic, layers };
        const res = await saveComicZilean(updatedComic);
        if (!res.error && res.data) {
            showSaveToast();
            if (clearHistory) clearHistory();
            return;
        } else {
            console.log(res);
        }
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
        <EditContext.Provider value={{ tool, setTool, selection, setSelection, saveComic }}>
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
    );
};

export const useEditContext = () => useContext(EditContext);

export default EditComic;
