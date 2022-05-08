import React, { useState } from "react";
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
import { IMAGE_URI } from "../../util/config";
import { IUser } from "../../context/authcontext";
import { useToastContext } from "../../context/toastcontext";

interface Props {
    comments: { author: Record<any, any>; text: string; createdAt?: Date }[];
    userRating: number;
    rating: number;
    author: Record<any, any>;
    user?: IUser;
    handleSubscribe: (e: React.FormEvent) => Promise<void>;
    handleUnsubscribe: (e: React.FormEvent) => Promise<void>;
    handleAddComment: (text: string) => Promise<void>;
    handleDeleteComment: (index: number) => Promise<void>;
    handleUpdateRating: (value: number) => Promise<void>;
}

const ViewZomp: React.FC<Props> = props => {
    const {
        comments,
        author,
        user,
        userRating,
        rating,
        handleSubscribe,
        handleUnsubscribe,
        handleUpdateRating,
        handleAddComment,
        handleDeleteComment,
    } = props;
    const [comment, setComment] = useState<string>("");
    const { addToast } = useToastContext();

    return (
        <>
            <Styled.ASSContainer>
                <Styled.AuthorContainer>
                    <Styled.Avatar src={`${IMAGE_URI}${author.profilePicture}`}></Styled.Avatar>
                    <div>
                        <Link href={"/user/" + author.username} passHref>
                            <Typography variant="h4" component="a" color="black">
                                {author.username}
                            </Typography>
                        </Link>
                        <Typography variant="h6">
                            {author.subscriberCount + " Subscribers"}
                        </Typography>
                    </div>
                </Styled.AuthorContainer>
                <Styled.SSContainer>
                    {user && user?.username! !== author.username! ? (
                        user?.subscriptions.includes(author._id) ? (
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
                                value={parseInt((Math.round(rating * 100) / 100).toFixed(1))}
                                precision={0.1}
                                readOnly
                                sx={{
                                    "& .MuiRating-iconFilled": {
                                        color: "#39a78e",
                                    },
                                }}
                            />
                            <Typography variant="h6">
                                ({(Math.round(rating * 100) / 100).toFixed(1)})
                            </Typography>
                        </div>
                    </Styled.Rating>
                    <Styled.Rating>
                        <Typography variant="h6">Your Rating</Typography>
                        <div style={{ display: "flex", justifyContent: "right" }}>
                            <Rating
                                name="your-rating"
                                value={userRating}
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
                                ({userRating === -1 ? "None" : userRating})
                            </Typography>
                        </div>
                    </Styled.Rating>
                </Styled.RatingsContainer>
            </Styled.ASSContainer>
            <Styled.ColumnContainer>
                <Divider />
            </Styled.ColumnContainer>
            <Styled.ASSContainer>
                <Typography variant="h4">Comments ({comments.length})</Typography>
                {user ? (
                    <Styled.SSButton
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={!comment}
                        onClick={() => {
                            handleAddComment(comment);
                            setComment("");
                        }}
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
                {comments.map((val, index) => (
                    <ListItem
                        alignItems="flex-start"
                        sx={{ padding: "8px 0" }}
                        key={`comment-${index}`}
                        secondaryAction={
                            <>
                                {user?._id === val.author._id && (
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
        </>
    );
};

export default ViewZomp;
