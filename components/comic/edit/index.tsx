import React, { createContext, useContext, useState } from "react";
import Toolbar from "./toolbar";
import Widebar from "./widebar";
import Editor from "./editor";
import * as Styled from "./styles";

interface IToolContext {
    tool: string;
    setTool?: React.Dispatch<React.SetStateAction<string>>;
}

const ToolContext = createContext<IToolContext>({ tool: "" });

const EditComic: React.FC = () => {
    const [tool, setTool] = useState("");

    return (
        <ToolContext.Provider value={{ tool, setTool }}>
            <Styled.EditorOuter>
                <Styled.EditorInner>
                    <Toolbar />
                    <Widebar />
                    <Editor />
                </Styled.EditorInner>
            </Styled.EditorOuter>
        </ToolContext.Provider>
    );
};

export const useToolContext = () => useContext(ToolContext);

export default EditComic;
