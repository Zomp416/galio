import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Chapter from "./chapter";
import { useAuthContext } from "../../../context/authcontext";
import { useToastContext } from "../../../context/toastcontext";
import { updateUserSubscription } from "../../../util/zileanUser";
import { rateStory, commentStory, deleteCommentStory } from "../../../util/zileanStory";
import ViewZomp from "../../view";
import * as Styled from "./styles";

interface Props {
    story: Record<any, any>;
    storyAuthor: Record<any, any>;
}

const ViewStory: React.FC<Props> = props => {
    // TODO maybe change the story/author/comment state hooks into context...
    // using props as an initial state value is a React anti-pattern, but it's easier to implement :p
    const [story, setStory] = useState<Record<any, any>>(props.story);
    const [storyAuthor, setStoryAuthor] = useState<Record<any, any>>(props.storyAuthor);
    const [commentList, setCommentList] = useState<
        { author: Record<any, any>; text: string; createdAt?: Date }[]
    >(story.comments || []);
    const [userRating, setUserRating] = useState<number>(-1);
    const { user } = useAuthContext();
    // Yep!
    const [userTemp, setUserTemp] = useState(user);
    const { addToast } = useToastContext();

    // Find user rating -- not a scalable solution, but it works
    useEffect(() => {
        if (!userTemp) return;
        for (let i = 0; i < userTemp.storyRatings.length; i++) {
            if (userTemp.storyRatings[i].id === story._id) {
                setUserRating(userTemp.storyRatings[i].rating);
                break;
            }
        }
    }, [userTemp, story._id]);

    const handleSubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await updateUserSubscription({ authorID: storyAuthor._id, type: "add" });
        if (!data.error) {
            setStoryAuthor({ ...storyAuthor, subscriberCount: storyAuthor.subscriberCount + 1 });
            setUserTemp({
                ...userTemp!,
                subscriptions: [...userTemp!.subscriptions, storyAuthor._id],
            });
            addToast("success", `Subscribed to ${storyAuthor.username}`);
        } else {
            addToast("error", "Unable to subscribe");
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await updateUserSubscription({ authorID: storyAuthor._id, type: "remove" });
        if (!data.error) {
            setStoryAuthor({ ...storyAuthor, subscriberCount: storyAuthor.subscriberCount - 1 });
            setUserTemp({
                ...userTemp!,
                subscriptions: userTemp!.subscriptions.filter(val => val !== storyAuthor._id),
            });
            addToast("success", `Unsubscribed from ${storyAuthor.username}`);
        } else {
            addToast("error", "Unable to unsubscribe");
        }
    };

    const handleAddComment = async (text: string) => {
        if (text && userTemp) {
            const data = await commentStory(story._id, text);
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
            const data = await deleteCommentStory(story._id, new Date(commentToDelete.createdAt));
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
        const res = await rateStory(story._id, value);
        if (!res.error && res.data) {
            const { ratingTotal, ratingCount, rating } = res.data;
            setStory({
                ...story,
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
                                {story.tags.map((val: string, index: number) => (
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
                </Styled.RowContainer>
                <Chapter story={story.story}></Chapter>
                <ViewZomp
                    comments={commentList}
                    user={userTemp}
                    author={storyAuthor}
                    userRating={userRating}
                    rating={story.rating || 0}
                    handleSubscribe={handleSubscribe}
                    handleUnsubscribe={handleUnsubscribe}
                    handleUpdateRating={handleUpdateRating}
                    handleAddComment={handleAddComment}
                    handleDeleteComment={handleDeleteComment}
                />
            </Styled.ViewStoryContainer>
        </>
    );
};

export default ViewStory;
