import React, { createContext, useContext, useState } from "react";
import TitleIcon from "@mui/icons-material/Title";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SquareIcon from "@mui/icons-material/Square";
import ImageIcon from "@mui/icons-material/Image";
import * as Styled from "./styles";
import ToolItem from "./toolitem";

interface IToolTabContext {
    toolTab: number;
    setToolTab?: React.Dispatch<React.SetStateAction<number>>;
}

const ToolTabContext = createContext<IToolTabContext>({ toolTab: -1 });

const Actions: React.FC = () => {
    const [toolTab, setToolTab] = useState(-1);

    return (
        <ToolTabContext.Provider value={{ toolTab, setToolTab }}>
            <Styled.Toolbar>
                <ToolItem icon={<TitleIcon />} text="EDIT TITLE/DESCRIPTION" tab={0} />
                <ToolItem icon={<ImageIcon />} text="ADD IMAGE LAYER" tab={1} />
                <ToolItem icon={<TextFieldsIcon />} text="ADD TEXT LAYER" tab={2} />
                <ToolItem icon={<SquareIcon />} text="ADD PANEL LAYER" tab={3} />
            </Styled.Toolbar>
            <Styled.Widebar></Styled.Widebar>
        </ToolTabContext.Provider>
    );
};

export const useToolTabContext = () => useContext(ToolTabContext);

export default Actions;
