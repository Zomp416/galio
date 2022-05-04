import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, CardContent } from "@mui/material";
import * as Styled from "./styles";
import { getImage } from "../../../../util/zilean";
import { getComic } from "../../../../util/zileanComic";

interface Comic {
    _id: string;
    title: string;
    views: number;
    publishedAt: string;
}

const ComicCard: React.FC<{ comic?: any; user?: any }> = ({ comic, user }) => {
    const [displayedComic, setComic] = useState<Comic>();
    const [comicImage, setComicImage] = useState("");
    useEffect(() => {
        async function getDisplayedComic() {
            const data = await getComic(comic);
            setComic(data.data);
            setComicImage(data.data?.renderedImage);
        }
        getDisplayedComic();
    }, [comic, displayedComic?.publishedAt]);

    return (
        <>
            <Link href={`/comic/view/` + displayedComic?._id}>
                <a>
                    {displayedComic?.publishedAt ? (
                        <Styled.ResultCard>
                            <Styled.CardThumbnailContainer>
                                {comicImage ? (
                                    <Styled.CardThumbnail
                                        src={
                                            comicImage
                                                ? "https://zomp-media.s3.us-east-1.amazonaws.com/" +
                                                  comicImage
                                                : ""
                                        }
                                    />
                                ) : (
                                    <Styled.CardNoThumbnail></Styled.CardNoThumbnail>
                                )}
                            </Styled.CardThumbnailContainer>
                            <CardContent>
                                <Typography variant="h5" component="div" fontWeight="bold">
                                    {displayedComic?.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    fontWeight="bold"
                                >
                                    {user.username}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {displayedComic?.views + " views"}
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

export default ComicCard;
