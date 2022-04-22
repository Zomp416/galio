import React from "react";
import { Typography } from "@mui/material";
import { useEditContext } from "..";

const title = (tool: string, selected: boolean) => {
    switch (tool) {
        case "title":
            return "Edit Title/Description";
        case "tags":
            return "Manage Tags";
        case "image":
            return `${selected ? "Edit" : "New"} Image Layer`;
        case "panel":
            return `${selected ? "Edit" : "New"} Panel Layer`;
        case "text":
            return `${selected ? "Edit" : "New"} Text Layer`;
        default:
            return "";
    }
};

const Title: React.FC = () => {
    const { tool, selection } = useEditContext();

    return (
        <div style={{ width: "100%", textAlign: "center", padding: "10px" }}>
            <Typography variant="h6" fontWeight="bold">
                {title(tool, selection !== -1)}
            </Typography>
        </div>
    );
};

export default Title;
