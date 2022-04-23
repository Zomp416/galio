import React from "react";
import * as Styled from "./styles";
import Title from "./title";
import TitleProperties from "./properties/title";
import GeneralProperties from "./properties/general";
import TextProperties from "./properties/text";
import PanelProperties from "./properties/panel";
import ImageUploadProperties from "./properties/imageupload";
import ImageSearchProperties from "./properties/imagesearch";
import { useEditContext } from "..";
import PanelActions from "./actions/panel";

const Actions: React.FC = () => {
    const { tool } = useEditContext();

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
            {tool === "panel" && (
                <>
                    <PanelActions />
                    <PanelProperties />
                </>
            )}
            {tool === "title" || tool === "tags" || <GeneralProperties />}
        </Styled.Widebar>
    );
};

export default Actions;
