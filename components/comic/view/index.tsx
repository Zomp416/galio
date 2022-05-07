import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    Divider,
    IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import * as Styled from "./styles";
import { useAuthContext } from "../../../context/authcontext";
import { useToastContext } from "../../../context/toastcontext";
import { updateUserSubscription } from "../../../util/zileanUser";
import { rateComic, commentComic, deleteCommentComic } from "../../../util/zileanComic";
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
    const [commentList, setCommentList] = useState<
        { author: Record<any, any>; text: string; createdAt?: Date }[]
    >(comic.comments || []);
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(-1);
    const { user } = useAuthContext();
    // Yep!
    const [userTemp, setUserTemp] = useState(user);
    const { addToast } = useToastContext();

    // Find user rating -- not a scalable solution, but it works
    useEffect(() => {
        if (!userTemp) return;
        for (let i = 0; i < userTemp.comicRatings.length; i++) {
            if (userTemp.comicRatings[i].id === comic._id) {
                setRating(userTemp.comicRatings[i].rating);
                break;
            }
        }
    }, [userTemp, comic._id]);

    const handleSubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await updateUserSubscription({ authorID: comicAuthor._id, type: "add" });
        if (!data.error) {
            setComicAuthor({ ...comicAuthor, subscriberCount: comicAuthor.subscriberCount + 1 });
            setUserTemp({
                ...userTemp!,
                subscriptions: [...userTemp!.subscriptions, comicAuthor._id],
            });
            addToast("success", `Subscribed to ${comicAuthor.username}`);
        } else {
            addToast("error", "Unable to subscribe");
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await updateUserSubscription({ authorID: comicAuthor._id, type: "remove" });
        if (!data.error) {
            setComicAuthor({ ...comicAuthor, subscriberCount: comicAuthor.subscriberCount - 1 });
            setUserTemp({
                ...userTemp!,
                subscriptions: userTemp!.subscriptions.filter(val => val !== comicAuthor._id),
            });
            addToast("success", `Unsubscribed from ${comicAuthor.username}`);
        } else {
            addToast("error", "Unable to unsubscribe");
        }
    };

    const handleAddComment = async () => {
        if (comment && userTemp) {
            const data = await commentComic(comic._id, comment);
            if (!data.error) {
                setCommentList(data.data.comments || []);
                setComment("");
                addToast("success", `Added Comment`);
            } else {
                addToast("error", "Unable to add comment");
            }
        } else {
            addToast("error", "Unable to add comment");
        }
    };

    const handleDeleteComment = async (index: number) => {
        const commentToDelete = commentList[index];
        if (userTemp && commentToDelete.createdAt) {
            const data = await deleteCommentComic(comic._id, new Date(commentToDelete.createdAt));
            if (!data.error) {
                setCommentList(data.data.comments || []);
                setComment("");
                addToast("success", `Deleted Comment`);
            } else {
                addToast("error", "Unable to delete comment");
            }
        } else {
            addToast("error", "Unable to delete comment");
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
            addToast("success", `Updated Rating`);
        } else {
            addToast("error", "Unable to update rating");
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
                        {userTemp && userTemp?.username! !== comicAuthor.username! ? (
                            userTemp?.subscriptions.includes(comicAuthor._id) ? (
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
                    {userTemp ? (
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
                    disabled={!userTemp}
                    sx={{ width: "100%", margin: "10px 0" }}
                />
                <List sx={{ width: "100%" }}>
                    {commentList.map((val, index) => (
                        <ListItem
                            alignItems="flex-start"
                            sx={{ padding: "8px 0" }}
                            key={`comment-${index}`}
                            secondaryAction={
                                <>
                                    {userTemp?._id === val.author._id && (
                                        <IconButton
                                            edge="end"
                                            onClick={() => {
                                                handleDeleteComment(index);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src={`${IMAGE_URI}${val.author.profilePicture}`}></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <>
                                        <Link href={`/user/${val.author.username}`} passHref>
                                            <Typography variant="body1" component="a" color="black">
                                                {val.author.username || "Zomp User"}
                                            </Typography>
                                        </Link>
                                        &nbsp;&nbsp;
                                        <Typography variant="body1" component="a" color="black">
                                            {val.createdAt
                                                ? new Date(val.createdAt).toLocaleDateString()
                                                : ""}
                                        </Typography>
                                    </>
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
