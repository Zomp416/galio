import React from "react";
import { useRouter } from "next/router";
import { Rating, TableRow, TableCell, Grow, Button } from "@mui/material";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSelectionContext } from "../..";
import * as Styled from "./styles";

interface Props {
    _id: string;
    title: string;
    splashURL: string;
    publishedAt: Date;
    rating: number;
    index: number;
}

const PublishTable: React.FC<Props> = props => {
    const { selection, setSelection } = useSelectionContext();
    const router = useRouter();

    const onSelect = () => {
        if (props.index == selection) setSelection!(-1);
        else setSelection!(props.index);
    };

    return (
        <>
            <TableRow onClick={onSelect}>
                <TableCell style={{ width: "1px" }}>
                    <Styled.Image src={props.splashURL} />
                </TableCell>
                <TableCell>{props.title}</TableCell>
                <TableCell style={{ width: "1px", whiteSpace: "nowrap" }}>
                    <Grow in={selection === props.index}>
                        <Styled.Menu>
                            <Button onClick={() => router.push(`/comic/view/${props._id}`)}>
                                <VisibilityIcon />
                            </Button>
                            <Button>
                                <UnpublishedIcon />
                            </Button>
                            <Button>
                                <DeleteIcon />
                            </Button>
                        </Styled.Menu>
                    </Grow>
                </TableCell>
                <TableCell style={{ width: "1px" }}>
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
                </TableCell>
                <TableCell align="left" style={{ width: "1px", whiteSpace: "nowrap" }}>
                    {moment(props.publishedAt).calendar(null, {
                        sameDay: "[Today] h:mm a",
                        lastDay: "[Yesterday]",
                        lastWeek: "[Last] dddd",
                        sameElse: "DD/MM/YYYY",
                    })}
                </TableCell>
            </TableRow>
        </>
    );
};

export default PublishTable;