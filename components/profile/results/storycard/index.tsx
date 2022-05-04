import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, CardContent } from "@mui/material";
import * as Styled from "./styles";
import { getStory } from "../../../../util/zileanStory";

interface Story {
    _id: string;
    title: string;
    views: number;
    publishedAt: string;
}

const StoryCard: React.FC<{ story?: any; user?: any }> = ({ story, user }) => {
    const [displayedStory, setStory] = useState<Story>();
    const [coverArt, setCoverArt] = useState("");
    useEffect(() => {
        async function getDisplayedComic() {
            const data = await getStory(story);
            setStory(data.data);
            setCoverArt(data.data?.coverart);
        }
        getDisplayedComic();
    }, [displayedStory?.publishedAt, story]);

    return (
        <>
            <Link href={`/story/view/` + displayedStory?._id}>
                <a>
                    {displayedStory?.publishedAt ? (
                        <Styled.ResultCard>
                            <Styled.CardThumbnailContainer>
                                {coverArt ? (
                                    <Styled.CardThumbnail
                                        src={
                                            coverArt
                                                ? "https://zomp-media.s3.us-east-1.amazonaws.com/" +
                                                  coverArt
                                                : ""
                                        }
                                    />
                                ) : (
                                    <Styled.CardNoThumbnail></Styled.CardNoThumbnail>
                                )}
                            </Styled.CardThumbnailContainer>
                            <CardContent>
                                <Typography variant="h5" component="div" fontWeight="bold">
                                    {displayedStory?.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    fontWeight="bold"
                                >
                                    {user.username}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {displayedStory?.views + " views"}
                                </Typography>
                            </CardContent>
                        </Styled.ResultCard>
                    ) : (
                        <></>
                    )}{" "}
                </a>
            </Link>
        </>
    );
};

export default StoryCard;
