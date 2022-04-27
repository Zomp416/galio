import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useStoryContext } from "../../../../../context/storycontext";
import { useEditContext } from "../..";
import { IChapter } from "../../../../../context/storycontext/model";

const EditChaptersProperties: React.FC = () => {
    const { chapters, newdo } = useStoryContext();
    const { selection, setSelection } = useEditContext();
    let lastIndex = chapters.length;

    if (!chapters) {
        return <div></div>;
    }

    return (
        <div>
            <List>
                {chapters.map((val: any, index: any) => (
                    <ListItem key={`${index}-modal-tag`}>
                        <ListItemText primary={val.chapterName} />
                        <ListItemAvatar>
                            <IconButton onClick={() => setSelection!(index)}>
                                <EditIcon></EditIcon>
                            </IconButton>
                            {index === 0 ? (
                                <></>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        console.log(index);
                                        newdo("deleteChapter", { index: index });
                                        setSelection!(index - 1);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </ListItemAvatar>
                    </ListItem>
                ))}
                <ListItem>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            newdo("addChapter", {
                                chapter: { chapterName: "Untitled Chapter", text: "" },
                            });
                            setSelection!(lastIndex);
                            // setSelection!(selection + 1);
                        }}
                    >
                        Add New Chapter
                    </Button>
                </ListItem>
            </List>
        </div>
    );
};

export default EditChaptersProperties;
