import React from "react";
import * as Styled from "./styles";
import Title from "./title";
import TitleProperties from "./properties/title";
import GeneralProperties from "./properties/general";
import TextProperties from "./properties/text";
import PanelProperties from "./properties/panel";
import TagProperties from "./properties/tags";
import ImageUploadProperties from "./actions/imageupload";
import ImageSearchProperties from "./actions/imagesearch";

import { useEditContext } from "..";
import PanelActions from "./actions/panel";

const Actions: React.FC = () => {
    const { tool, selection } = useEditContext();

    return (
        <Styled.Widebar>
            <Title />
            {tool === "title" && <TitleProperties />}
            {tool === "image" && (
                <>
                    <ImageUploadProperties />
                    <ImageSearchProperties />
                </>
            )}
            {tool === "text" && <TextProperties />}
            {tool === "tags" && <TagProperties />}
            {tool === "panel" && (
                <>
                    <PanelActions />
                    <PanelProperties />
                </>
            )}
            {selection !== -1 && tool !== "title" && tool !== "tags" && <GeneralProperties />}
        </Styled.Widebar>
    );
};

export default Actions;
