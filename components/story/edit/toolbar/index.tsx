import React from "react";
import { Divider } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import TagIcon from "@mui/icons-material/Tag";
import ImageIcon from "@mui/icons-material/Image";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import * as Styled from "./styles";
import ToolTab from "./tooltab";

const Actions: React.FC = () => {
    return (
        <Styled.Toolbar>
            <Divider sx={{ margin: "5px", visibility: "hidden" }} />
            <ToolTab icon={<TitleIcon />} text="EDIT TITLE/DESCRIPTION" name={"title"} />
            <ToolTab icon={<ImageIcon />} text="CHANGE COVER ART" name={"coverart"} />
            <ToolTab icon={<TagIcon />} text="MANAGE TAGS" name={"tags"} />
            <ToolTab icon={<MenuBookIcon />} text="EDIT CHAPTERS" name={"editchapters"} />
        </Styled.Toolbar>
    );
};

export default Actions;
