import React, { createContext, useContext, useState } from "react";
import TitleIcon from "@mui/icons-material/Title";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SquareIcon from "@mui/icons-material/Square";
import ImageIcon from "@mui/icons-material/Image";
import * as Styled from "./styles";
import ToolItem from "./tooltab";
import GeneralProperties from "./properties/general";
import TextProperties from "./properties/text";
import PanelProperties from "./properties/panel";
import ImageProperties from "./properties/image";

interface IToolTabContext {
    toolTab: number;
    setToolTab?: React.Dispatch<React.SetStateAction<number>>;
}

const ToolTabContext = createContext<IToolTabContext>({ toolTab: 0 });

const Actions: React.FC = () => {
    const [toolTab, setToolTab] = useState(0);

    return (
        <ToolTabContext.Provider value={{ toolTab, setToolTab }}>
            <Styled.Toolbar>
                <ToolItem icon={<TitleIcon />} text="EDIT TITLE/DESCRIPTION" tab={1} />
                <ToolItem icon={<ImageIcon />} text="ADD IMAGE LAYER" tab={2} />
                <ToolItem icon={<TextFieldsIcon />} text="ADD TEXT LAYER" tab={3} />
                <ToolItem icon={<SquareIcon />} text="ADD PANEL LAYER" tab={4} />
            </Styled.Toolbar>
            <Styled.Widebar>
                <GeneralProperties />
                <TextProperties />
                <PanelProperties />
                <ImageProperties />
            </Styled.Widebar>
        </ToolTabContext.Provider>
    );
};

export const useToolTabContext = () => useContext(ToolTabContext);

export default Actions;
