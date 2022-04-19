import React, { useState } from "react";
import Link from "next/link";
import {
    Divider,
    TextField,
    Typography,
    Rating,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import * as Styled from "./styles";

const ViewComic: React.FC<{ comic?: any; comicAuthor?: any }> = ({ comic, comicAuthor }) => {
    const [comment, setComment] = useState<string>("");
    const [tags, setTags] = useState<string[]>(comic.tags);
    const [rating, setRating] = useState<number | null>(4.5);

    return (
        <>
            <Styled.ViewComicContainer>
                <Typography variant="h4" width={"100%"}>
                    {comic.title}
                </Typography>
                <Styled.TVContainer>
                    <Styled.TagsContainer>
                        {tags.map((val, index) => (
                            <Styled.Tag
                                key={`${index}-tag`}
                                variant="contained"
                                color="secondary"
                                size="small"
                                sx={{ textTransform: "none" }}
                            >
                                {val}
                            </Styled.Tag>
                        ))}
                    </Styled.TagsContainer>
                    <Styled.ViewContainer>
                        <Typography variant="h6">{comic.views + " Views"}</Typography>
                    </Styled.ViewContainer>
                </Styled.TVContainer>
                <Styled.ComicImage>Image</Styled.ComicImage>
                <Styled.ASSContainer>
                    <Styled.AuthorContainer>
                        <Styled.Avatar></Styled.Avatar>
                        <div>
                            <Link href={"/user/" + comicAuthor.username} passHref>
                                <Typography variant="h4" component="a" color="black">
                                    {comicAuthor.username}
                                </Typography>
                            </Link>
                            <Typography variant="h6">
                                {comicAuthor.subscriberCount + " Subscribers"}
                            </Typography>
                        </div>
                    </Styled.AuthorContainer>
                    <Styled.SSContainer>
                        <Styled.SSButton variant="contained" color="primary" size="large">
                            Share
                            <ShareIcon />
                        </Styled.SSButton>
                        <Styled.SSButton variant="contained" color="primary" size="large">
                            Subscribe
                        </Styled.SSButton>
                    </Styled.SSContainer>
                </Styled.ASSContainer>
                <Styled.ColumnContainer>
                    <Divider />
                </Styled.ColumnContainer>
                <Styled.ASSContainer>
                    <Typography variant="h4">Ratings</Typography>
                    <Styled.RatingsContainer>
                        <Styled.Rating>
                            <Typography variant="h6">Average</Typography>
                            <div style={{ display: "flex", justifyContent: "right" }}>
                                <Rating
                                    name="average-rating"
                                    value={2.4}
                                    precision={0.1}
                                    readOnly
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#39a78e",
                                        },
                                    }}
                                />
                                <Typography variant="h6">(2.4)</Typography>
                            </div>
                        </Styled.Rating>
                        <Styled.Rating>
                            <Typography variant="h6">Your Rating</Typography>
                            <div style={{ display: "flex", justifyContent: "right" }}>
                                <Rating
                                    name="your-rating"
                                    value={rating}
                                    precision={0.5}
                                    onChange={(e, value) => {
                                        setRating(value);
                                    }}
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#39a78e",
                                        },
                                    }}
                                />
                                <Typography variant="h6">({rating || 0})</Typography>
                            </div>
                        </Styled.Rating>
                    </Styled.RatingsContainer>
                </Styled.ASSContainer>
                <Styled.ColumnContainer>
                    <Divider />
                </Styled.ColumnContainer>
                <Styled.ASSContainer>
                    <Typography variant="h4">Comments (1)</Typography>
                    <Styled.SSButton
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={!comment}
                    >
                        Add Comment
                    </Styled.SSButton>
                </Styled.ASSContainer>
                <TextField
                    id="add-comment"
                    label="Add A Comment"
                    multiline
                    maxRows={4}
                    value={comment}
                    onChange={e => {
                        setComment(e.target.value);
                    }}
                    sx={{ width: "100%", margin: "10px 0" }}
                />
                <List sx={{ width: "100%" }}>
                    <ListItem alignItems="flex-start" sx={{ padding: "8px 0" }}>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link href="/user/Joe Schmo" passHref>
                                    <Typography variant="body1" component="a" color="black">
                                        Joe Schmo
                                    </Typography>
                                </Link>
                            }
                            secondary="Ayo! This was a good one."
                        />
                    </ListItem>
                </List>
            </Styled.ViewComicContainer>
        </>
    );
};

export default ViewComic;
