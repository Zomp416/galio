import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, CardContent } from "@mui/material";
import * as Styled from "./styles";
import { getImage } from "../../../../util/zilean";
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
            if (data.error) alert(data.error);
            else setStory(data.data);

            if (displayedStory?.publishedAt) {
                //TODO coverart doesnt show like in mystories
                if (data.data?.coverArt) {
                    const profile = await getImage(data.data?.coverArt);
                    if (profile.error) alert(profile.error);
                    else setCoverArt(profile.data?.coverArt.imageURL);
                }
            }
        }
        getDisplayedComic();
    }, [displayedStory?.publishedAt, story]);

    return (
        <>
            {displayedStory?.publishedAt ? (
                <Styled.ResultCard>
                    <Styled.CardThumbnailContainer>
                        {/* TODO make everything clickable */}
                        <Link href={`/story/view/` + displayedStory?._id}>
                            <a>
                                {coverArt === "" ? (
                                    <Styled.CardNoThumbnail></Styled.CardNoThumbnail>
                                ) : (
                                    <Styled.CardThumbnail
                                        src={
                                            coverArt
                                                ? "https://zomp-media.s3.us-east-1.amazonaws.com/" +
                                                  coverArt
                                                : ""
                                        }
                                    />
                                )}
                            </a>
                        </Link>
                    </Styled.CardThumbnailContainer>
                    <CardContent>
                        <Typography variant="h5" component="div" fontWeight="bold">
                            {displayedStory?.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight="bold">
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
        </>
    );
};

export default StoryCard;
