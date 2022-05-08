import React, { useEffect, useState } from "react";
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
import { useToastContext } from "../../../context/toastcontext";
import { useAuthContext } from "../../../context/authcontext";
import { updateUserSubscription } from "../../../util/zileanUser";

import * as Styled from "./styles";

const ViewStory: React.FC<{ story?: any; storyAuthor?: any }> = ({ story, storyAuthor }) => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number | null>(3.5);
    const [tags] = useState<string[]>(story.tags);
    const { user } = useAuthContext();
    const { addToast } = useToastContext();

    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [subscribers, setSubscribers] = useState<number>(storyAuthor.subscriberCount);

    useEffect(() => {
        async function getSubscribedToUser() {
            if (user != null) {
                for (let i = 0; i < user?.subscriptions?.length!; i++) {
                    if (user?.subscriptions![i] === storyAuthor._id) {
                        setSubscribed(true);
                    }
                }
            }
        }
        getSubscribedToUser();
    }, [storyAuthor._id, user, user?.subscriptions]);

    const handleSubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await updateUserSubscription({ authorID: storyAuthor._id, type: "add" });
        if (!data.error) {
            setSubscribed(true);
            setSubscribers(subscribers + 1);
            addToast("success", `Subscribed to ${storyAuthor.username}`);
        } else {
            addToast("error", "Unable to subscribe");
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await updateUserSubscription({ authorID: storyAuthor._id, type: "remove" });
        if (!data.error) {
            setSubscribed(false);
            setSubscribers(subscribers - 1);
            addToast("success", `Unsubscribed from ${storyAuthor.username}`);
        } else {
            addToast("error", "Unable to unsubscribe");
        }
    };

    return (
        <>
            <Styled.ViewStoryContainer>
                <Styled.RowContainer>
                    {story.coverart ? (
                        <Box
                            component="img"
                            sx={{
                                height: 100,
                                width: 70,
                                paddingRight: "10px",
                            }}
                            src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + story.coverart}
                        />
                    ) : (
                        <></>
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
                                    {subscribers + " Subscribers"}
                                </Styled.ColumnContainer>
                            </Styled.AuthorContainer>
                            <Styled.SSContainer>
                                <Styled.SSButton
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        addToast("success", "Successfully Copied URL");
                                    }}
                                >
                                    Share
                                    <ShareIcon />
                                </Styled.SSButton>
                                {user !== null && user?.username! !== storyAuthor.username! ? (
                                    subscribed ? (
                                        <Styled.SSButton
                                            variant="contained"
                                            style={{ backgroundColor: "red" }}
                                            onClick={handleUnsubscribe}
                                        >
                                            Unsubscribe
                                        </Styled.SSButton>
                                    ) : (
                                        <Styled.SSButton
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubscribe}
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
