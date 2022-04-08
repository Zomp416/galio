import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Dialog,
    DialogTitle,
    TextField,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import * as Styled from "./styles";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <div>Loading Text Editor...</div>,
});

const story = {
    _id: "a2",
    title: "Crewmate",
    author: "amogus",
    description:
        "Among Us is a 2018 online multiplayer social deduction game developed and published by \
        American game studio Innersloth. The game was inspired by the party game Mafia and the science \
        fiction horror film The Thing. The game allows for cross-platform play, first being released on \
        iOS and Android devices in June 2018 and on Windows later that year in November.",
    splashURL:
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/crewmate-indra-tirto.jpg",
    published: false,
    rating: 4.3,
    views: 210,
};

const ViewStory: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>(["Comedy", "College"]);
    const [addTag, setAddTag] = useState<string>("");

    return (
        <>
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
                                    setTags([...tags, addTag]);
                                    setAddTag("");
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </ListItemAvatar>
                    </ListItem>
                </List>
            </Dialog>
            <Styled.ViewStoryContainer>
                <Styled.RowContainer>
                    <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 70,
                            paddingRight: "10px",
                        }}
                        alt={story.title}
                        src={story.splashURL}
                    />
                    <Styled.ColumnContainer>
                        <Typography
                            variant="h4"
                            width={"100%"}
                            sx={{ paddingTop: "10px", marginBottom: "5px" }}
                        >
                            Story Title
                            <IconButton>
                                <EditIcon color="primary" />
                            </IconButton>
                        </Typography>
                        <Styled.TVContainer>
                            <Styled.TagsContainer>
                                {tags.map((val, index) => (
                                    <Styled.Tag key={`${index}-tag`}>{val}</Styled.Tag>
                                ))}
                                <Styled.ManageTag
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                >
                                    Manage Tags
                                </Styled.ManageTag>
                            </Styled.TagsContainer>
                        </Styled.TVContainer>
                    </Styled.ColumnContainer>
                </Styled.RowContainer>
                <Styled.Story>
                    <Styled.ButtonsContainer>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={() => {
                                setChanged(false);
                            }}
                        >
                            Save {changed && "*"}
                        </Button>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Chapter 1
                            <IconButton>
                                <EditIcon color="primary" />
                            </IconButton>
                        </Typography>
                        <Button variant="contained" color="primary" endIcon={<ChevronRightIcon />}>
                            Chapter 2
                        </Button>
                    </Styled.ButtonsContainer>
                    <ReactQuill
                        defaultValue={story.description}
                        placeholder="Start Typing..."
                        style={{ flex: 1 }}
                        onChange={(_, __, source) => {
                            if (!changed && source === "user") {
                                setChanged(true);
                            }
                        }}
                    />
                </Styled.Story>
            </Styled.ViewStoryContainer>
        </>
    );
};

export default ViewStory;
