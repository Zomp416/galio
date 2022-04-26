import React, { createContext, useState, useContext } from "react";
import * as Styled from "./styles";
import "react-quill/dist/quill.snow.css";
import Editor from "./editor";
import Toolbar from "./toolbar";
import Widebar from "./widebar";

interface IEditContext {
    tool: string;
    setTool?: React.Dispatch<React.SetStateAction<string>>;
    saveStory?: () => Promise<void>;
    publishStory?: (file: File) => Promise<void>;
}

const EditContext = createContext<IEditContext>({ tool: "" });

const EditStory: React.FC = () => {
    const [tool, setTool] = useState("");
    const saveStory = async () => {};
    const publishStory = async () => {};

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
            </EditContext.Provider>
        </>
    );
};
export const useEditContext = () => useContext(EditContext);

export default EditStory;
