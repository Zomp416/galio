import React, { useState } from "react";
// import Link from "next/link";
import {
    Typography,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    TextField,
    Divider,
    Select,
    MenuItem,
    Card,
    CardMedia,
    CardContent,
    Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Styled from "./styles";

const ResultCard: React.FC = () => {
    return (
        <Card
            sx={{
                backgroundColor: "transparent",
                textAlign: "center",
                boxShadow: "none",
                width: "17.5%",
                borderRadius: "0",
            }}
        >
            <CardMedia
                component="img"
                height="200px"
                width="200px"
                image=""
                alt="Image"
                style={{ backgroundColor: "grey" }}
            />
            <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold">
                    Comic Title
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="bold">
                    MasonMa37
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    100 Views
                </Typography>
            </CardContent>
        </Card>
    );
};

const Search: React.FC = () => {
    const [tags, setTags] = useState<string[]>(["Comedy", "College"]);
    const [addTag, setAddTag] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<string>("Comics");
    const [time, setTime] = useState<string>("Today");
    const [sort, setSort] = useState<string>("alpha");

    return (
        <Styled.SearchContainer>
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
            <Typography gutterBottom variant="h3" width={"100%"} sx={{ fontWeight: "bold" }}>
                Results for &quot;Mason&quot;
            </Typography>
            <Styled.FilterContainer>
                <Typography variant="h4" sx={{ fontWeight: "bold", marginRight: "20px" }}>
                    Filter Tags:
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
            </Styled.FilterContainer>
            <Styled.ResultsContainer>
                <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    onChange={e => {
                        setCategory(e.target.value);
                    }}
                    label="Category"
                    variant="standard"
                    sx={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                    }}
                >
                    <MenuItem value={"Comics"}>Comics</MenuItem>
                    <MenuItem value={"Stories"}>Stories</MenuItem>
                    <MenuItem value={"Users"}>Users</MenuItem>
                </Select>
                <Styled.TagListContainer>
                    <Select
                        labelId="sort-label"
                        id="sort"
                        value={sort}
                        onChange={e => {
                            setSort(e.target.value);
                        }}
                        label="Views"
                        variant="standard"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                        }}
                    >
                        <MenuItem value={"alpha"}>A-Z</MenuItem>
                        <MenuItem value={"views"}>Most Viewed</MenuItem>
                        <MenuItem value={"rating"}>Highest Rated</MenuItem>
                    </Select>
                    <Select
                        labelId="time-label"
                        id="time"
                        value={time}
                        onChange={e => {
                            setTime(e.target.value);
                        }}
                        label="Time"
                        variant="standard"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            marginLeft: "20px",
                        }}
                    >
                        <MenuItem value={"Today"}>Today</MenuItem>
                        <MenuItem value={"Week"}>This Week</MenuItem>
                        <MenuItem value={"Month"}>This Month</MenuItem>
                        <MenuItem value={"Year"}>This Year</MenuItem>
                        <MenuItem value={"All"}>All Time</MenuItem>
                    </Select>
                </Styled.TagListContainer>
            </Styled.ResultsContainer>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />
            <Styled.CardsContainer>
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
            </Styled.CardsContainer>
            <Pagination />
            <Typography variant="h6" component="div" sx={{ marginTop: "10px" }}>
                4-4 Results
            </Typography>
        </Styled.SearchContainer>
    );
};

export default Search;
