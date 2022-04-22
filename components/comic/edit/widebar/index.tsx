import React from "react";
import * as Styled from "./styles";
import Title from "./title";
import TitleProperties from "./properties/title";
import GeneralProperties from "./properties/general";
import TextProperties from "./properties/text";
import PanelProperties from "./properties/panel";
import ImageProperties from "./properties/image";
import { useToolContext } from "..";
import PanelActions from "./actions/panel";

const Actions: React.FC = () => {
    const { tool } = useToolContext();

    return (
        <Styled.Widebar>
            <Title />
            {tool === "title" ? <TitleProperties /> : <></>}
            {tool === "image" && <ImageProperties />}
            {tool === "text" ? <TextProperties /> : <></>}
            {tool === "panel" && (
                <>
                    <PanelActions />
                    <PanelProperties />
                </>
            )}
            {tool === "title" || tool === "tags" ? <></> : <GeneralProperties />}
        </Styled.Widebar>
    );
};

export default Actions;
