import React, { createContext, useContext, useState } from "react";
import TitleIcon from "@mui/icons-material/Title";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SquareIcon from "@mui/icons-material/Square";
import ImageIcon from "@mui/icons-material/Image";
import * as Styled from "./styles";
import ToolTab from "./tooltab";

const Actions: React.FC = () => {
    return (
        <Styled.Toolbar>
            <ToolTab icon={<TitleIcon />} text="EDIT TITLE/DESCRIPTION" name={"title"} />
            <ToolTab icon={<ImageIcon />} text="ADD IMAGE LAYER" name={"image"} />
            <ToolTab icon={<TextFieldsIcon />} text="ADD TEXT LAYER" name={"text"} />
            <ToolTab icon={<SquareIcon />} text="ADD PANEL LAYER" name={"panel"} />
        </Styled.Toolbar>
    );
};

export default Actions;
