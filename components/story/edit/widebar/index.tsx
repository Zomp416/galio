import React from "react";
import * as Styled from "./styles";
import Title from "./title";
import TitleProperties from "./properties/title";
import TagProperties from "./properties/tags";
import CoverArtProperties from "./properties/coverart";
import EditChaptersProperties from "./properties/editchapter";
import { useEditContext } from "..";

const Actions: React.FC = () => {
    const { tool } = useEditContext();

    return (
        <Styled.Widebar>
            <Title />
            {tool === "title" && <TitleProperties />}
            {tool === "tags" && <TagProperties />}
            {tool === "coverart" && <CoverArtProperties />}
            {tool === "editchapters" && <EditChaptersProperties />}
        </Styled.Widebar>
    );
};

export default Actions;
