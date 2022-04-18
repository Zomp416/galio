import React from "react";
import { Typography } from "@mui/material";
import { useToolContext } from "../..";

const title = (tool: string) => {
    switch (tool) {
        case "title":
            return "Edit Title/Description";
        case "image":
            return "New Image Layer";
        case "panel":
            return "New Panel Layer";
        case "text":
            return "New Text Layer";
        default:
            return "";
    }
};

const WidebarTitle: React.FC = () => {
    const { tool } = useToolContext();

    return (
        <div style={{ width: "100%", textAlign: "center", padding: "10px" }}>
            <Typography fontWeight="bold">{title(tool)}</Typography>
        </div>
    );
};

export default WidebarTitle;
