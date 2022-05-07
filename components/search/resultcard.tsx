import React from "react";
import Link from "next/link";
import { Card, CardMedia, CardContent, Typography, Rating } from "@mui/material";

import { IMAGE_URI } from "../../util/config";

interface Props {
    _id: string;
    title: string;
    author: string;
    splashURL: string;
    rating: number;
    views: number;
}

const ResultCard: React.FC<Props> = props => {
    return (
        <Card
            sx={{
                backgroundColor: "transparent",
                textAlign: "center",
                boxShadow: "none",
                borderRadius: "0",
                width: "200px",
            }}
        >
            <Link href={`/comic/view/${props._id}`}>
                <a style={{ color: "inherit" }}>
                    <CardMedia
                        component="img"
                        height="200px"
                        width="200px"
                        image={IMAGE_URI + props.splashURL}
                        style={{ backgroundColor: "grey" }}
                    />
                </a>
            </Link>
            <CardContent>
                <Link href={`/comic/view/${props._id}`}>
                    <a style={{ color: "inherit" }}>
                        <Typography variant="h5" component="div" fontWeight="bold">
                            {props.title}
                        </Typography>
                    </a>
                </Link>
                <Link href={`/user/${props.author}`}>
                    <a style={{ color: "inherit" }}>
                        <Typography variant="body1" color="text.secondary" fontWeight="bold">
                            {props.author}
                        </Typography>
                    </a>
                </Link>
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
                <Typography variant="body1" color="text.secondary">
                    {props.views} Views
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ResultCard;
