import React from "react";
import { TextField, List, ListItem } from "@mui/material";
import { useStoryContext } from "../../../../../context/storycontext";

const TitleProperties: React.FC = () => {
    const { story, newdo } = useStoryContext();

    return (
        <List>
            <ListItem>
                <TextField
                    name="title"
                    label="Title"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={story ? story.title : "Unnamed Story"}
                    onChange={e => {
                        newdo("editStory", {
                            title: e.target.value,
                        });
                    }}
                />
            </ListItem>
            <ListItem>
                <TextField
                    name="description"
                    label="Description"
                    type="text"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={10}
                    maxRows={10}
                    value={story ? story.description : ""}
                    onChange={e => {
                        newdo("editStory", {
                            description: e.target.value,
                        });
                    }}
                />
            </ListItem>
        </List>
    );
};

export default TitleProperties;
