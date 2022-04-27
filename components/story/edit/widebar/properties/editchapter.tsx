import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStoryContext } from "../../../../../context/storycontext";
import { saveStory } from "../../../../../util/zilean";
import { IChapter } from "../../../../../context/storycontext/model";

const EditChaptersProperties: React.FC = () => {
    const [addTag, setAddTag] = useState<string>("");
    const { story, newdo } = useStoryContext();

    if (!story) {
        return <div></div>;
    }

    return (
        <div>
            <List>
                {story.story.map((val, index) => (
                    <ListItem key={`${index}-modal-tag`}>
                        <ListItemText primary={val.chapterName} />
                        <ListItemAvatar>
                            <IconButton
                            // onClick={() => {
                            //     newdo("editStory", {
                            //         tags: story.tags.filter(tag => tag !== val),
                            //     });
                            // }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemAvatar>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default EditChaptersProperties;
