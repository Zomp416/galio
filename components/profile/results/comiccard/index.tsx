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
            if (data.error) alert(data.error);
            else setComic(data.data);

            if (displayedComic?.publishedAt) {
                //TODO renderedimage doesnt show like in mycomics
                if (data.data?.renderedImage) {
                    const profile = await getImage(data.data?.renderedImage);
                    if (profile.error) alert(profile.error);
                    else setComicImage(profile.data?.renderedImage.imageURL);
                }
            }
        }
        getDisplayedComic();
    }, [comic, displayedComic?.publishedAt]);

    return (
        <>
            {displayedComic?.publishedAt ? (
                <Styled.ResultCard>
                    <Styled.CardThumbnailContainer>
                        {/* TODO make everything clickable */}
                        <Link href={`/comic/view/` + displayedComic?._id}>
                            <a>
                                {comicImage === "" ? (
                                    <Styled.CardNoThumbnail></Styled.CardNoThumbnail>
                                ) : (
                                    <Styled.CardThumbnail src={comicImage} />
                                )}
                            </a>
                        </Link>
                    </Styled.CardThumbnailContainer>
                    <CardContent>
                        <Typography variant="h5" component="div" fontWeight="bold">
                            {displayedComic?.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight="bold">
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
        </>
    );
};

export default ComicCard;
