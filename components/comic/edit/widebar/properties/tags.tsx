import React, { useState } from "react";
import {
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useComicContext } from "../../../../../context/comiccontext";

const TagProperties: React.FC = () => {
    const [addTag, setAddTag] = useState<string>("");
    const { comic, newdo } = useComicContext();

    if (!comic) {
        return <div></div>;
    }

    return (
        <div>
            <List>
                {comic.tags.map((val, index) => (
                    <ListItem key={`${index}-modal-tag`}>
                        <ListItemText primary={val} />
                        <ListItemAvatar>
                            <IconButton
                                onClick={() => {
                                    newdo("editComic", {
                                        tags: comic.tags.filter(tag => tag !== val),
                                    });
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemAvatar>
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemText
                        primary={
                            <TextField
                                margin="dense"
                                id="addTag"
                                label="Add Tag"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={addTag}
                                onChange={e => {
                                    setAddTag(e.target.value);
                                }}
                            />
                        }
                    />
                    <ListItemAvatar>
                        <IconButton
                            disabled={!addTag}
                            onClick={() => {
                                newdo("editComic", {
                                    tags: [...comic.tags, addTag],
                                });
                                setAddTag("");
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </ListItemAvatar>
                </ListItem>
            </List>
        </div>
    );
};

export default TagProperties;
