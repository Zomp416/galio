import React, { useState } from "react";
import Link from "next/link";
import {
    AppBar,
    Box,
    Button,
    Divider,
    TextField,
    Toolbar,
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
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import SettingsIcon from "@mui/icons-material/Settings";

import * as Styled from "./styles";

//TODO REMOVE
const story = {
    _id: "a2",
    title: "Crewmate",
    author: "amogus",
    description:
        "Among Us is a 2018 online multiplayer social deduction game developed and published by \
        American game studio Innersloth. The game was inspired by the party game Mafia and the science \
        fiction horror film The Thing. The game allows for cross-platform play, first being released on \
        iOS and Android devices in June 2018 and on Windows later that year in November.",
    splashURL:
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/crewmate-indra-tirto.jpg",
    published: false,
    rating: 4.3,
    views: 210,
};

//TODO make go next and previous chapter work
const ViewStory: React.FC = () => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number | null>(3.5);

    //TODO code the functions
    const handleTextIncrease = () => {
        window.location.href = "pagelink";
    };
    const handleTextDecrease = () => {
        window.location.href = "pagelink";
    };
    const handleFonts = () => {
        window.location.href = "pagelink";
    };
    const handleSettings = () => {
        window.location.href = "pagelink";
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
                        src={story.splashURL}
                    />
                    <Styled.ColumnContainer>
                        <Typography variant="h4" width={"100%"} sx={{ paddingTop: "10px" }}>
                            Story Title
                        </Typography>
                        <Styled.TVContainer>
                            <Styled.TagsContainer>
                                <Styled.Tag
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    sx={{ textTransform: "none" }}
                                >
                                    Comedy
                                </Styled.Tag>
                                <Styled.Tag
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    sx={{ textTransform: "none" }}
                                >
                                    College
                                </Styled.Tag>
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
                                            <Link href={"/user/" + story.author} passHref>
                                                {story.author}
                                            </Link>
                                        </Typography>
                                    </div>
                                    1.4k Subscribers
                                </Styled.ColumnContainer>
                            </Styled.AuthorContainer>
                            <Styled.SSContainer>
                                <Styled.SSButton variant="contained" color="primary">
                                    Share
                                    <ShareIcon />
                                </Styled.SSButton>
                                <Styled.SSButton variant="contained" color="primary">
                                    Subscribe
                                </Styled.SSButton>
                            </Styled.SSContainer>
                        </Styled.ASSContainer>
                    </Styled.ViewContainer>
                </Styled.RowContainer>
                <Styled.Story>
                    <AppBar position="static" color="primary" sx={{ height: "50px" }}>
                        <Toolbar
                            disableGutters
                            style={{
                                minHeight: "50px",
                            }}
                            sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <TextIncreaseIcon
                                    onClick={handleTextIncrease}
                                    sx={[
                                        {
                                            marginRight: "10px",
                                            borderRadius: "10px",
                                            "&:hover": {
                                                color: "#39A78E",
                                                backgroundColor: "#BCECDC",
                                                border: "2px solid #3F3F3F",
                                            },
                                        },
                                    ]}
                                />
                                <TextDecreaseIcon
                                    onClick={handleTextDecrease}
                                    sx={[
                                        {
                                            marginRight: "10px",
                                            borderRadius: "10px",
                                            "&:hover": {
                                                color: "#39A78E",
                                                backgroundColor: "#BCECDC",
                                                border: "2px solid #3F3F3F",
                                            },
                                        },
                                    ]}
                                />
                            </Box>
                            <FontDownloadIcon
                                onClick={handleFonts}
                                sx={[
                                    {
                                        borderRadius: "10px",
                                        "&:hover": {
                                            color: "#39A78E",
                                            backgroundColor: "#BCECDC",
                                            border: "2px solid #3F3F3F",
                                        },
                                    },
                                ]}
                            />
                            <SettingsIcon
                                onClick={handleSettings}
                                sx={[
                                    {
                                        borderRadius: "10px",
                                        "&:hover": {
                                            color: "#39A78E",
                                            backgroundColor: "#BCECDC",
                                            border: "2px solid #3F3F3F",
                                        },
                                    },
                                ]}
                            />
                        </Toolbar>
                    </AppBar>
                    <Styled.ButtonsContainer>
                        <Button variant="contained" color="primary">
                            <ChevronLeftIcon />
                            Title
                        </Button>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Chapter 1
                        </Typography>
                        <Button variant="contained" color="primary">
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
