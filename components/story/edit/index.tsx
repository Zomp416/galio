import React, { createContext, useState, useContext } from "react";
import * as Styled from "./styles";
import "react-quill/dist/quill.snow.css";
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
    const { story } = useStoryContext();

    const saveStory = async () => {
        if (!story) return;

        const updatedStory = { ...story };
        const res = await saveStoryZilean(updatedStory);
        if (!res.error && res.data) {
            console.log("yay");
        } else {
            console.log(res);
        }
    };
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
