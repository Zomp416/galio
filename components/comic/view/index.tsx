import React, { useEffect, useState } from "react";
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
import { useAuthContext } from "../../../context/authcontext";
import { unsubscribe, subscribe } from "../../../util/zileanUser";

const ViewComic: React.FC<{ comic?: any; comicAuthor?: any }> = ({ comic, comicAuthor }) => {
    const [comment, setComment] = useState<string>("");
    const [tags] = useState<string[]>(comic.tags);
    const [rating, setRating] = useState<number | null>(4.5);
    const { user } = useAuthContext();

    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [subscribers, setSubscribers] = useState<number>(comicAuthor.subscriberCount);

    useEffect(() => {
        async function getSubscribedToUser() {
            if (user != null) {
                for (let i = 0; i < user?.subscriptions?.length!; i++) {
                    if (user?.subscriptions![i] === comicAuthor._id) {
                        setSubscribed(true);
                    }
                }
            }
        }
        getSubscribedToUser();
    }, [comicAuthor._id, user, user?.subscriptions]);

    const handleSubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await subscribe(userid);
        if (!data.error) {
            setSubscribed(true);
            setSubscribers(subscribers + 1);
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await unsubscribe(userid);
        if (!data.error) {
            setSubscribed(false);
            setSubscribers(subscribers - 1);
        }
    };

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
                {comic.renderedImage ? (
                    <Styled.ComicImage
                        src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + comic.renderedImage}
                    ></Styled.ComicImage>
                ) : (
                    <Styled.NoComicImage></Styled.NoComicImage>
                )}
                <Styled.ASSContainer>
                    <Styled.AuthorContainer>
                        <Styled.Avatar></Styled.Avatar>
                        <div>
                            <Link href={"/user/" + comicAuthor.username} passHref>
                                <Typography variant="h4" component="a" color="black">
                                    {comicAuthor.username}
                                </Typography>
                            </Link>
                            <Typography variant="h6">{subscribers + " Subscribers"}</Typography>
                        </div>
                    </Styled.AuthorContainer>
                    <Styled.SSContainer>
                        <Styled.SSButton variant="contained" color="primary" size="large">
                            Share
                            <ShareIcon />
                        </Styled.SSButton>
                        {user !== null && user?.username! !== comicAuthor.username! ? (
                            subscribed ? (
                                <Styled.SSButton
                                    variant="contained"
                                    style={{ backgroundColor: "red" }}
                                    onClick={e => {
                                        handleUnsubscribe(e, comicAuthor._id.toString());
                                    }}
                                >
                                    Unsubscribe
                                </Styled.SSButton>
                            ) : (
                                <Styled.SSButton
                                    variant="contained"
                                    color="primary"
                                    onClick={e => {
                                        handleSubscribe(e, comicAuthor._id.toString());
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
