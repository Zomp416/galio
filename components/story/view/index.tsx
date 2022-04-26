import React, { useState } from "react";
import Link from "next/link";
import {
    Box,
    Button,
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAuthContext } from "../../../context/authcontext";
import { unsubscribe, subscribe } from "../../../util/zilean";

import * as Styled from "./styles";

//TODO make go next and previous chapter work
const ViewStory: React.FC<{ story?: any; storyAuthor?: any }> = ({ story, storyAuthor }) => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number | null>(3.5);
    const [tags, setTags] = useState<string[]>(story.tags);
    const { user } = useAuthContext();

    let initialSubscribe = false;
    if (storyAuthor.username === user!.username) {
        for (let i = 0; i < user?.subscriptions?.length!; i++) {
            if (user?.subscriptions![i] === storyAuthor._id) {
                initialSubscribe = true;
            }
        }
    }
    const [subscribed, setSubscribed] = useState<boolean>(initialSubscribe);

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
                    <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 70,
                            paddingRight: "10px",
                        }}
                        alt={story.title}
                        src={story.coverart}
                    />
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
                                        <Typography variant="h5" component="a" color="black">
                                            <Link href={"/user/" + storyAuthor.username} passHref>
                                                {storyAuthor.username}
                                            </Link>
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
                                {/* TODO do subscribe */}
                                {user?.username! === storyAuthor.username! ? (
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
                <Styled.Story>
                    <Styled.ButtonsContainer>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#BCECDC",
                                color: "#3F3F3F",
                            }}
                        >
                            <ChevronLeftIcon />
                            Title
                        </Button>

                        <Typography variant="h4" color="secondary" sx={{ fontWeight: "bold" }}>
                            Chapter 1
                        </Typography>

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#BCECDC",
                                color: "#3F3F3F",
                            }}
                        >
                            Chapter 2
                            <ChevronRightIcon />
                        </Button>
                    </Styled.ButtonsContainer>

                    <Typography
                        sx={{
                            marginBottom: "15px",
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Amet consectetur
                        adipiscing elit ut aliquam purus sit. Ipsum dolor sit amet consectetur
                        adipiscing. Vulputate enim nulla aliquet porttitor lacus luctus. Risus
                        nullam eget felis eget. Volutpat consequat mauris nunc congue nisi. Vitae
                        tortor condimentum lacinia quis vel eros donec. Mauris sit amet massa vitae
                        tortor. Nulla aliquet porttitor lacus luctus accumsan. Magna fermentum
                        iaculis eu non diam phasellus vestibulum lorem. Purus non enim praesent
                        elementum facilisis leo vel fringilla est.
                    </Typography>
                    <Typography
                        sx={{
                            marginBottom: "15px",
                        }}
                    >
                        Praesent semper feugiat nibh sed. Id consectetur purus ut faucibus. Neque
                        viverra justo nec ultrices dui sapien. Pulvinar elementum integer enim neque
                        volutpat. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus
                        interdum. Mi sit amet mauris commodo quis imperdiet massa. Et malesuada
                        fames ac turpis. Ac ut consequat semper viverra nam libero justo laoreet.
                        Dui id ornare arcu odio. Varius duis at consectetur lorem donec massa.
                        Imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis
                    </Typography>
                    <Typography
                        sx={{
                            marginBottom: "15px",
                        }}
                    >
                        Gravida in fermentum et sollicitudin ac orci. Rhoncus est pellentesque elit
                        ullamcorper dignissim. Amet consectetur adipiscing elit ut aliquam purus
                        sit. Ipsum dolor sit amet consectetur adipiscing. Vulputate enim nulla
                        aliquet porttitor lacus luctus. Risus nullam eget felis .
                    </Typography>

                    <Divider />
                </Styled.Story>
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
            </Styled.ViewStoryContainer>
        </>
    );
};

export default ViewStory;
