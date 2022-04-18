import React from "react";
import { Divider } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SquareIcon from "@mui/icons-material/Square";
import ImageIcon from "@mui/icons-material/Image";
import TagIcon from "@mui/icons-material/Tag";

import * as Styled from "./styles";
import ToolTab from "./tooltab";

const Actions: React.FC = () => {
    return (
        <Styled.Toolbar>
            <Divider sx={{ margin: "5px", visibility: "hidden" }} />
            <ToolTab icon={<TitleIcon />} text="EDIT TITLE/DESCRIPTION" name={"title"} />
            <ToolTab icon={<TagIcon />} text="MANAGE TAGS" name={"tags  "} />
            <Divider sx={{ margin: "2px", visibility: "hidden" }} />
            <ToolTab icon={<ImageIcon />} text="ADD IMAGE LAYER" name={"image"} />
            <ToolTab icon={<TextFieldsIcon />} text="ADD TEXT LAYER" name={"text"} />
            <ToolTab icon={<SquareIcon />} text="ADD PANEL LAYER" name={"panel"} />
        </Styled.Toolbar>
    );
};

export default Actions;
