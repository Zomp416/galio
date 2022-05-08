import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import * as Styled from "./styles";
import { useAuthContext } from "../../../context/authcontext";
import { useToastContext } from "../../../context/toastcontext";
import { updateUserSubscription } from "../../../util/zileanUser";
import { rateComic, commentComic, deleteCommentComic } from "../../../util/zileanComic";
import { IMAGE_URI } from "../../../util/config";
import ViewZomp from "../../view";

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
    const [userRating, setUserRating] = useState<number>(-1);
    const { user } = useAuthContext();
    // Yep!
    const [userTemp, setUserTemp] = useState(user);
    const { addToast } = useToastContext();

    // Find user rating -- not a scalable solution, but it works
    useEffect(() => {
        if (!userTemp) return;
        for (let i = 0; i < userTemp.comicRatings.length; i++) {
            if (userTemp.comicRatings[i].id === comic._id) {
                setUserRating(userTemp.comicRatings[i].rating);
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

    const handleAddComment = async (text: string) => {
        if (text && userTemp) {
            const data = await commentComic(comic._id, text);
            if (!data.error) {
                setCommentList(data.data.comments || []);
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
            const { ratingTotal, ratingCount, rating } = res.data;
            setComic({
                ...comic,
                ratingTotal,
                ratingCount,
                rating,
            });
            setUserRating(value);
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
                <ViewZomp
                    comments={commentList}
                    user={userTemp}
                    author={comicAuthor}
                    userRating={userRating}
                    rating={comic.rating || 0}
                    handleSubscribe={handleSubscribe}
                    handleUnsubscribe={handleUnsubscribe}
                    handleUpdateRating={handleUpdateRating}
                    handleAddComment={handleAddComment}
                    handleDeleteComment={handleDeleteComment}
                />
            </Styled.ViewComicContainer>
        </>
    );
};

export default ViewComic;
