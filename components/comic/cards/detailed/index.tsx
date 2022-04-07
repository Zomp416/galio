import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography, Rating } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

import * as Styled from "./styles";

interface CardProps {
    comic: {
        _id: string;
        title: string;
        description: string;
        splashURL: string;
        published: boolean;
        rating: number;
        views: number;
    };
}

const Card: React.FC<CardProps> = props => {
    return (
        <Styled.Card className="detailedcard">
            <Styled.Splash className="splash">
                <Image src={props.comic.splashURL} layout="fill" />
            </Styled.Splash>
            <Styled.Details className="details">
                <Styled.DetailsTop className="detailstop">
                    <Styled.Title className="title">
                        <Typography variant="h4" width={"100%"}>
                            {props.comic.title}
                            {!props.comic.published ? (
                                <Link href={`/comic/edit/${props.comic._id}`}>
                                    <a>
                                        <EditIcon />
                                    </a>
                                </Link>
                            ) : (
                                <></>
                            )}
                        </Typography>
                    </Styled.Title>
                    {props.comic.published ? (
                        <Styled.PublishIcons className="icons">
                            <Rating
                                value={props.comic.rating}
                                precision={0.1}
                                readOnly
                                sx={{
                                    "& .MuiRating-iconFilled": {
                                        color: "#39a78e",
                                    },
                                }}
                            />
                            <Styled.Views>
                                <Styled.ViewEye>
                                    <VisibilityIcon />
                                </Styled.ViewEye>
                                <Styled.ViewNum>
                                    <Typography variant="body2" width={"100%"}>
                                        {props.comic.views}
                                    </Typography>
                                </Styled.ViewNum>
                            </Styled.Views>
                        </Styled.PublishIcons>
                    ) : (
                        <></>
                    )}
                </Styled.DetailsTop>
                <Typography variant="body1" width={"100%"}>
                    {props.comic.description}
                </Typography>
            </Styled.Details>
        </Styled.Card>
    );
};

export default Card;
