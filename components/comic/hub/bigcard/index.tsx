import React from "react";
import Link from "next/link";
import { Typography, Rating } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import * as Styled from "./styles";

interface Props {
    _id: string;
    title: string;
    author: string;
    description: string;
    splashURL: string;
    rating: number;
    views: number;
}

const BigCard: React.FC<Props> = props => {
    return (
        <Styled.Card className="detailedcard">
            <Styled.Splash className="splash">
                <Link href={`/comic/view/${props._id}`}>
                    <a>
                        <>
                            <Styled.Image src={props.splashURL} />
                        </>
                    </a>
                </Link>
            </Styled.Splash>
            <Styled.Details className="details">
                <Styled.DetailsTop className="detailstop">
                    <Styled.TopLeft className="title">
                        <Typography variant="h4" width={"100%"}>
                            {props.title}
                        </Typography>
                        <Typography variant="body2" width={"100%"}>
                            by&nbsp;
                            <Link href={"/user/" + props.author}>
                                <a style={{ color: "gray" }}>{props.author}</a>
                            </Link>
                        </Typography>
                    </Styled.TopLeft>
                    <Styled.TopRight className="icons">
                        <Rating
                            value={props.rating}
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
                                    {props.views}
                                </Typography>
                            </Styled.ViewNum>
                        </Styled.Views>
                    </Styled.TopRight>
                </Styled.DetailsTop>
                <Typography variant="body1" width={"100%"}>
                    {props.description}
                </Typography>
            </Styled.Details>
        </Styled.Card>
    );
};

export default BigCard;
