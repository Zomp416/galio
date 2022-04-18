import React, { useState } from "react";
import { Typography } from "@mui/material";
import * as Styled from "./styles";
import { useToolTabContext } from "..";

const ToolItem: React.FC<{ icon: React.ReactNode; text: string; tab: number }> = props => {
    const [hovered, setHovered] = useState(false);
    const { toolTab, setToolTab } = useToolTabContext();

    const toggleTab = () => {
        setToolTab!(props.tab === toolTab ? -1 : props.tab);
    };

    return (
        <Styled.Item
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={toggleTab}
        >
            {toolTab === props.tab ? <Styled.Highlight /> : <></>}
            <Styled.ToolIcon>{props.icon}</Styled.ToolIcon>
            {hovered && toolTab !== props.tab ? (
                <Styled.Tooltip>
                    <Typography variant="subtitle1">{props.text}</Typography>
                </Styled.Tooltip>
            ) : (
                <></>
            )}
        </Styled.Item>
    );
};

export default ToolItem;
