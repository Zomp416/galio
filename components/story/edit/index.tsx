import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import BrushIcon from "@mui/icons-material/Brush";
import ImageIcon from "@mui/icons-material/Image";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import * as Styled from "./styles";

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

const ViewStory: React.FC = () => {
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
                            {/* TODO: IMPLEMENT BUTTON OVER THE ICONS */}
                            <Box>
                                <FormatBoldIcon />
                                <FormatItalicIcon
                                    sx={{
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                    }}
                                />
                                <FormatUnderlinedIcon />
                            </Box>
                            <FormatColorTextIcon />
                            <BrushIcon />
                            <ImageIcon />
                            <FormatListBulletedIcon />
                            <Box>
                                <FormatAlignLeftIcon />
                                <FormatAlignCenterIcon
                                    sx={{
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                    }}
                                />
                                <FormatAlignRightIcon />
                            </Box>
                            <DeleteOutlineIcon />
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
                    <Box
                        border={1}
                        borderColor="#3390FF"
                        sx={{
                            padding: "10px",
                        }}
                    >
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Amet consectetur
                            adipiscing elit ut aliquam purus sit. Ipsum dolor sit amet consectetur
                            adipiscing. Vulputate enim nulla aliquet porttitor lacus luctus. Risus
                            nullam eget felis eget. Volutpat consequat mauris nunc congue nisi.
                            Vitae tortor condimentum lacinia quis vel eros donec. Mauris sit amet
                            massa vitae tortor. Nulla aliquet porttitor lacus luctus accumsan. Magna
                            fermentum iaculis eu non diam phasellus vestibulum lorem. Purus non enim
                            praesent elementum facilisis leo vel fringilla est.
                        </Typography>
                        <Typography
                            sx={{
                                marginTop: "15px",
                                marginBottom: "15px",
                            }}
                        >
                            Praesent semper feugiat nibh sed. Id consectetur purus ut faucibus.
                            Neque viverra justo nec ultrices dui sapien. Pulvinar elementum integer
                            enim neque volutpat. Quam elementum pulvinar etiam non quam lacus
                            suspendisse faucibus interdum. Mi sit amet mauris commodo quis imperdiet
                            massa. Et malesuada fames ac turpis. Ac ut consequat semper viverra nam
                            libero justo laoreet. Dui id ornare arcu odio. Varius duis at
                            consectetur lorem donec massa. Imperdiet dui accumsan sit amet nulla
                            facilisi morbi tempus iaculis
                        </Typography>
                        <Typography>
                            Gravida in fermentum et sollicitudin ac orci. Rhoncus est pellentesque
                            elit ullamcorper dignissim. Amet consectetur adipiscing elit ut aliquam
                            purus sit. Ipsum dolor sit amet consectetur adipiscing. Vulputate enim
                            nulla aliquet porttitor lacus luctus. Risus nullam eget felis . |
                        </Typography>
                    </Box>
                </Styled.Story>
            </Styled.ViewStoryContainer>
        </>
    );
};

export default ViewStory;
