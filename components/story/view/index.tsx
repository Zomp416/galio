import React, { useState } from "react";
import {
    Box,
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
import Chapter from "./chapter";
import { useAuthContext } from "../../../context/authcontext";
import { unsubscribe, subscribe } from "../../../util/zileanUser";

import * as Styled from "./styles";

const ViewStory: React.FC<{ story?: any; storyAuthor?: any; coverArt?: any }> = ({
    story,
    storyAuthor,
    coverArt,
}) => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number | null>(3.5);
    const [tags, setTags] = useState<string[]>(story.tags);
    const { user } = useAuthContext();

    let initialSubscribe = false;
    if (user != null) {
        if (storyAuthor.username === user!.username) {
            for (let i = 0; i < user?.subscriptions?.length!; i++) {
                if (user?.subscriptions![i] === storyAuthor._id) {
                    initialSubscribe = true;
                }
            }
        }
    }
    const [subscribed, setSubscribed] = useState<boolean>(initialSubscribe);

    // TODO subscribe doesnt update subscriber count
    const handleSubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await subscribe(userid);
        if (!data.error) {
            setSubscribed(true);
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await unsubscribe(userid);
        if (!data.error) {
            setSubscribed(false);
        }
    };

    return (
        <>
            <Styled.ViewStoryContainer>
                <Styled.RowContainer>
                    {coverArt === null ? (
                        <></>
                    ) : (
                        <Box
                            component="img"
                            sx={{
                                height: 100,
                                width: 70,
                                paddingRight: "10px",
                            }}
                            src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + coverArt}
                        />
                    )}
                    <Styled.ColumnContainer>
                        <Typography variant="h4" width={"100%"} sx={{ paddingTop: "10px" }}>
                            {story.title}
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
                        </Styled.TVContainer>
                    </Styled.ColumnContainer>
                    <Styled.ViewContainer>
                        <Styled.ASSContainer>
                            <Styled.AuthorContainer>
                                <Styled.Avatar></Styled.Avatar>
                                <Styled.ColumnContainer>
                                    <div>
                                        <Typography
                                            variant="h5"
                                            component="a"
                                            href={"/user/" + storyAuthor.username}
                                            color="black"
                                        >
                                            {storyAuthor.username}
                                        </Typography>
                                    </div>
                                    {storyAuthor.subscriberCount + " Subscribers"}
                                </Styled.ColumnContainer>
                            </Styled.AuthorContainer>
                            <Styled.SSContainer>
                                {/* TODO do share */}
                                <Styled.SSButton variant="contained" color="primary" size="large">
                                    Share
                                    <ShareIcon />
                                </Styled.SSButton>
                                {user !== null && user?.username! !== storyAuthor.username! ? (
                                    subscribed ? (
                                        <Styled.SSButton
                                            variant="contained"
                                            color="primary"
                                            style={{ backgroundColor: "red" }}
                                            onClick={e => {
                                                handleUnsubscribe(e, storyAuthor._id.toString());
                                            }}
                                        >
                                            Unsubscribe
                                        </Styled.SSButton>
                                    ) : (
                                        <Styled.SSButton
                                            variant="contained"
                                            color="primary"
                                            onClick={e => {
                                                handleSubscribe(e, storyAuthor._id.toString());
                                            }}
                                        >
                                            Subscribe
                                        </Styled.SSButton>
                                    )
                                ) : (
                                    <></>
                                )}
                            </Styled.SSContainer>
                        </Styled.ASSContainer>
                    </Styled.ViewContainer>
                </Styled.RowContainer>
                <Chapter story={story.story}></Chapter>
                <Styled.ASSContainer>
                    <Typography variant="h4">Ratings</Typography>
                    <Styled.RatingsContainer>
                        <Styled.Rating>
                            <Typography variant="h6">Average</Typography>
                            <div style={{ display: "flex", justifyContent: "right" }}>
                                <Rating
                                    name="average-rating"
                                    value={2.8}
                                    precision={0.1}
                                    readOnly
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#39a78e",
                                        },
                                    }}
                                />
                                <Typography variant="h6">(2.8)</Typography>
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
                                <Typography
                                    variant="body1"
                                    component="a"
                                    href="/user/Joe Schmo"
                                    color="black"
                                >
                                    Joe Schmo
                                </Typography>
                            }
                            secondary="Ayo! This was a good one."
                        />
                    </ListItem>
                </List>
            </Styled.ViewStoryContainer>
        </>
    );
};

export default ViewStory;
