import React from "react";
import { Typography } from "@mui/material";
import { useEditContext } from "..";

const title = (tool: string) => {
    switch (tool) {
        case "title":
            return "Edit Title/Description";
        case "tags":
            return "Manage Tags";
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

const Title: React.FC = () => {
    const { tool } = useEditContext();

    return (
        <div style={{ width: "100%", textAlign: "center", padding: "10px" }}>
            <Typography variant="h6" fontWeight="bold">
                {title(tool)}
            </Typography>
        </div>
    );
};

export default Title;
