import React from "react";
import { TextField, List, ListItem } from "@mui/material";
import { useComicContext } from "../../../../../context/comiccontext";

const TitleProperties: React.FC = () => {
    const { comic, newdo } = useComicContext();

    return (
        <List>
            <ListItem>
                <TextField
                    name="title"
                    label="Title"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={comic ? comic.title : "Unnamed Comic"}
                    onChange={e => {
                        newdo("editComic", {
                            squish: "title",
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
                    value={comic ? comic.description : ""}
                    onChange={e => {
                        newdo("editComic", {
                            squish: "description",
                            description: e.target.value,
                        });
                    }}
                />
            </ListItem>
        </List>
    );
};

export default TitleProperties;
