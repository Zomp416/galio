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
import { updateUserSubscription } from "../../../util/zileanUser";
import { rateComic } from "../../../util/zileanComic";
import { IMAGE_URI } from "../../../util/config";

// TODO change to zomp "Z" logo
const default_image = "assets/a8abb9ed-c384-408a-924e-d947df860a82.png";

interface Props {
    comic: Record<any, any>;
    comicAuthor: Record<any, any>;
}

const ViewComic: React.FC<Props> = props => {
    // TODO maybe change the comic/author/comment state hooks into context...
    // using props as an initial state value is a React anti-pattern, but it's easier to implement :p
    const [comic, setComic] = useState<Record<any, any>>(props.comic);
    const [comicAuthor, setComicAuthor] = useState<Record<any, any>>(props.comicAuthor);
    const [commentList, setCommentList] = useState<{ author: Record<any, any>; text: string }[]>(
        comic.comments || []
    );
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(-1);
    const { user } = useAuthContext();

    // Find user rating -- not a scalable solution, but it works
    useEffect(() => {
        if (!user) return;
        for (let i = 0; i < user.comicRatings.length; i++) {
            if (user.comicRatings[i].id === comic._id) {
                setRating(user.comicRatings[i].rating);
                break;
            }
        }
    }, [user, comic._id]);

    const handleSubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await updateUserSubscription({ authorID: comicAuthor._id, type: "add" });
        if (!data.error) {
            setComicAuthor({ ...comicAuthor, subscriberCount: comicAuthor.subscriberCount + 1 });
            // TODO UPDATE LOCAL CONTEXT OF USER
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await updateUserSubscription({ authorID: comicAuthor._id, type: "remove" });
        if (!data.error) {
            setComicAuthor({ ...comicAuthor, subscriberCount: comicAuthor.subscriberCount - 1 });
            // TODO UPDATE LOCAL CONTEXT OF USER
        }
    };

    const handleAddComment = () => {
        if (comment && user) {
            // TODO CALL BACKEND
            setCommentList([{ author: user, text: comment }, ...commentList]);
            setComment("");
        }
    };

    const handleUpdateRating = async (value: number) => {
        const res = await rateComic(comic._id, value);
        if (!res.error && res.data) {
            const { ratingTotal, ratingCount } = res.data;
            setComic({
                ...comic,
                ratingTotal,
                ratingCount,
            });
            setRating(value);
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
                        {comic.tags.map((val: string, index: number) => (
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
                <Styled.ComicImage
                    src={`${IMAGE_URI}${comic?.renderedImage || default_image}`}
                ></Styled.ComicImage>
                <Styled.ASSContainer>
                    <Styled.AuthorContainer>
                        <Styled.Avatar
                            src={`${IMAGE_URI}${comicAuthor.profilePicture}`}
                        ></Styled.Avatar>
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
                        {user !== null && user?.username! !== comicAuthor.username! ? (
                            user?.subscriptions.includes(comicAuthor._id) ? (
                                <Styled.SSButton
                                    variant="contained"
                                    style={{ backgroundColor: "red" }}
                                    onClick={e => {
                                        handleUnsubscribe(e);
                                    }}
                                >
                                    Unsubscribe
                                </Styled.SSButton>
                            ) : (
                                <Styled.SSButton
                                    variant="contained"
                                    color="primary"
                                    onClick={e => {
                                        handleSubscribe(e);
                                    }}
                                >
                                    Subscribe
                                </Styled.SSButton>
                            )
                        ) : (
                            <></>
                        )}
                        <Styled.SSButton variant="contained" color="primary" size="large">
                            Share
                            <ShareIcon />
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
                            <Typography variant="h6">Average Rating</Typography>
                            <div style={{ display: "flex", justifyContent: "right" }}>
                                <Rating
                                    name="average-rating"
                                    value={comic.ratingTotal / (comic.ratingCount || 1)}
                                    precision={0.1}
                                    readOnly
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#39a78e",
                                        },
                                    }}
                                />
                                <Typography variant="h6">
                                    ({comic.ratingTotal / (comic.ratingCount || 1)})
                                </Typography>
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
                                        handleUpdateRating(value || 0);
                                    }}
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#39a78e",
                                        },
                                    }}
                                />
                                <Typography variant="h6">
                                    ({rating === -1 ? "None" : rating})
                                </Typography>
                            </div>
                        </Styled.Rating>
                    </Styled.RatingsContainer>
                </Styled.ASSContainer>
                <Styled.ColumnContainer>
                    <Divider />
                </Styled.ColumnContainer>
                <Styled.ASSContainer>
                    <Typography variant="h4">Comments ({commentList.length})</Typography>
                    {user ? (
                        <Styled.SSButton
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={!comment}
                            onClick={handleAddComment}
                        >
                            Add Comment
                        </Styled.SSButton>
                    ) : (
                        // TODO STYLE THIS
                        <Link href="/login">Login to Comment</Link>
                    )}
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
                    disabled={!user}
                    sx={{ width: "100%", margin: "10px 0" }}
                />
                <List sx={{ width: "100%" }}>
                    {commentList.map((val, index) => (
                        <ListItem
                            alignItems="flex-start"
                            sx={{ padding: "8px 0" }}
                            key={`comment-${index}`}
                        >
                            <ListItemAvatar>
                                <Avatar src={`${IMAGE_URI}${val.author.profilePicture}`}></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Link href={`/user/${val.author.username}`} passHref>
                                        <Typography variant="body1" component="a" color="black">
                                            {val.author.username || "Zomp User"}
                                        </Typography>
                                    </Link>
                                }
                                secondary={val.text || ""}
                            />
                        </ListItem>
                    ))}
                </List>
            </Styled.ViewComicContainer>
        </>
    );
};

export default ViewComic;
