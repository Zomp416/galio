import React from "react";

import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSearchContext } from "../../context/searchcontext";

const TagDialog: React.FC = () => {
    const { tags, newTag, modalOpen, setTags, setNewTag, setModalOpen } = useSearchContext();

    return (
        <Dialog
            open={modalOpen}
            onClose={() => {
                setModalOpen(false);
            }}
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: "#E6F4F1",
                },
            }}
        >
            <DialogTitle sx={{ padding: "16px 16px" }}>Manage Tags</DialogTitle>
            <List>
                {tags.map((val, index) => (
                    <ListItem key={`${index}-modal-tag`}>
                        <ListItemText primary={val} />
                        <ListItemAvatar>
                            <IconButton
                                onClick={() => {
                                    setTags(tags.filter(tag => tag !== val));
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
                                value={newTag}
                                onChange={e => {
                                    setNewTag(e.target.value);
                                }}
                            />
                        }
                    />
                    <ListItemAvatar>
                        <IconButton
                            disabled={!newTag}
                            onClick={() => {
                                setTags([...tags, newTag]);
                                setNewTag("");
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </ListItemAvatar>
                </ListItem>
            </List>
        </Dialog>
    );
};

export default TagDialog;
