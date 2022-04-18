import React, { useState } from "react";
import { Typography } from "@mui/material";
import * as Styled from "./styles";
import { useToolContext } from "../..";

const ToolItem: React.FC<{ icon: React.ReactNode; text: string; name: string }> = props => {
    const [hovered, setHovered] = useState(false);
    const { tool, setTool } = useToolContext();

    const toggleTool = () => {
        setTool!(props.name === tool ? "" : props.name);
    };

    return (
        <Styled.Item
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onClick={toggleTool}
        >
            {tool === props.name ? <Styled.Highlight /> : <></>}
            <Styled.ToolIcon>{props.icon}</Styled.ToolIcon>
            {hovered && tool !== props.name ? (
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
