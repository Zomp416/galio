import React, { useState } from "react";
import Link from "next/link";

import { Fade, Typography, Rating, Stack, Container } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import * as Styled from "./styles";

interface Props {
    _id: string;
    title: string;
    author: string;
    splashURL: string;
    rating: number;
    views: number;
}

const SmallCard: React.FC<Props> = props => {
    const [hovered, setHovered] = useState(false);

    return (
        <Styled.Card
            className="simplecard"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Styled.Image src={props.splashURL} />
            <Link href={`/comic/view/${props._id}`}>
                <a style={{ color: "inherit" }}>
                    <Fade in={hovered}>
                        <Styled.CardHover>
                            <Container>
                                <Typography variant="subtitle1">{props.title}</Typography>
                                <Typography style={{ fontSize: 12 }}>by {props.author}</Typography>
                                <Rating
                                    value={props.rating}
                                    precision={0.1}
                                    readOnly
                                    size="small"
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#39a78e",
                                        },
                                    }}
                                />
                                <Stack direction="row" justifyContent="center">
                                    <VisibilityIcon style={{ fontSize: 16 }} />
                                    <Typography style={{ fontSize: 12 }}>{props.views}</Typography>
                                </Stack>
                            </Container>
                        </Styled.CardHover>
                    </Fade>
                </a>
            </Link>
        </Styled.Card>
    );
};

export default SmallCard;
