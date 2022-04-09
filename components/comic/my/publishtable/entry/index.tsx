import React from "react";
// import { useRouter } from "next/router";
import { Rating, TableRow, TableCell, Collapse } from "@mui/material";
import moment from "moment";

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
    // const router = useRouter();

    const onSelect = () => {
        // router.push(`/comic/view/${props._id}`);
        setSelection!(props.index);
    };

    return (
        <>
            <TableRow onClick={onSelect}>
                <TableCell style={{ width: "1px" }}>
                    <Styled.Image src={props.splashURL} />
                </TableCell>
                <TableCell>{props.title}</TableCell>
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
            <Collapse in={selection === props.index}>
                <TableRow>
                    <TableCell>menu</TableCell>
                </TableRow>
            </Collapse>
        </>
    );
};

export default PublishTable;
