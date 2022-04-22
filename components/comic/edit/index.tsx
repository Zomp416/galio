import React, { createContext, useContext, useEffect, useState } from "react";
import Toolbar from "./toolbar";
import Widebar from "./widebar";
import Editor from "./editor";
import * as Styled from "./styles";

interface IEditContext {
    tool: string;
    setTool?: React.Dispatch<React.SetStateAction<string>>;
    selection: number;
    setSelection?: React.Dispatch<React.SetStateAction<number>>;
}

const EditContext = createContext<IEditContext>({ tool: "", selection: -1 });

const EditComic: React.FC = () => {
    const [tool, setTool] = useState("");
    const [selection, setSelection] = useState(-1);

    return (
        <EditContext.Provider value={{ tool, setTool, selection, setSelection }}>
            <Styled.EditorOuter>
                <Styled.EditorInner>
                    <Toolbar />
                    <Widebar />
                    <Editor />
                </Styled.EditorInner>
            </Styled.EditorOuter>
        </EditContext.Provider>
    );
};

export const useEditContext = () => useContext(EditContext);

export default EditComic;
