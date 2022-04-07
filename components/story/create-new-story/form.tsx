import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Styled from "./styles";
import {
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const defaultValues = {
    title: "",
    description: "",
};

const Form: React.FC = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState(false);
    const [tags, setTags] = useState<string[]>(["Action", "Thriller"]);
    const [addTag, setAddTag] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formValues);
    };

    return (
        <>
            <Styled.StoryDetailsForm onSubmit={handleSubmit}>
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
                <TextField
                    id="title"
                    name="title"
                    label="Title"
                    type="title"
                    variant="outlined"
                    value={formValues.title}
                    onChange={handleInputChange}
                    error={error}
                    style={{ width: 600, marginBottom: 30 }}
                />
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    type="description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formValues.description}
                    onChange={handleInputChange}
                    error={error}
                    style={{ width: 600, marginBottom: 30 }}
                />
                <Styled.TagContainer>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", fontSize: "25px", marginBottom: "15px" }}
                    >
                        Tags:
                    </Typography>
                    <Styled.TagListContainer>
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
                    </Styled.TagListContainer>
                </Styled.TagContainer>
            </Styled.StoryDetailsForm>
        </>
    );
};

export default Form;
