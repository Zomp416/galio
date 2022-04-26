import React from "react";
import { TextField, List, ListItem } from "@mui/material";
import { useStoryContext } from "../../../../../context/storycontext";

const TitleProperties: React.FC = () => {
    const { story } = useStoryContext();

    return (
        <List>
            <ListItem>
                <TextField
                    name="title"
                    label="Title"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={story ? story.title : "Unnamed Comic"}
                    // onChange={e => {
                    //     newdo("editComic", {
                    //         squish: "title",
                    //         title: e.target.value,
                    //     });
                    // }}
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
                    // onChange={e => {
                    //     newdo("editComic", {
                    //         squish: "description",
                    //         description: e.target.value,
                    //     });
                    // }}
                />
            </ListItem>
        </List>
    );
};

export default TitleProperties;
