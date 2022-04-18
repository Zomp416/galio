import React from "react";
import Actions from "./actions";
import Editor from "./editor";
import * as Styled from "./styles";

const EditComic: React.FC = () => {
    return (
        <Styled.EditorOuter>
            <Styled.EditorInner>
                <Actions />
                <Editor />
            </Styled.EditorInner>
        </Styled.EditorOuter>
    );
};

export default EditComic;
