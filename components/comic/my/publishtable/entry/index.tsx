import React from "react";
import { useRouter } from "next/router";
import { Rating, TableRow, TableCell, Grow, Button } from "@mui/material";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { useToastContext } from "../../../../../context/toastcontext";
import { unpublishComic, deleteComic } from "../../../../../util/zileanComic";

import { useSelectionContext } from "../..";
import * as Styled from "./styles";

interface Props {
    _id: string;
    title: string;
    renderedImage: string;
    publishedAt: Date;
    rating: number;
    index: number;
}

const PublishTable: React.FC<Props> = props => {
    const { selection, setSelection } = useSelectionContext();
    const { addToast } = useToastContext();
    const router = useRouter();

    const onSelect = () => {
        if (props.index == selection) setSelection!(-1);
        else setSelection!(props.index);
    };

    const handleUnpublish = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await unpublishComic(props._id);
        if (!data.error) {
            router.push({ pathname: "/comic/my/" });
            addToast("success", `Unpublished ${props.title}`);
        }
    };

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await deleteComic(props._id);
        if (!data.error) {
            router.push({ pathname: "/comic/my/" });
            addToast("success", `Deleted ${props.title}`);
        }
    };

    return (
        <>
            <TableRow onClick={onSelect}>
                <TableCell style={{ width: "1px" }}>
                    {props.renderedImage ? (
                        <Styled.Image
                            src={
                                "https://zomp-media.s3.us-east-1.amazonaws.com/" +
                                props.renderedImage
                            }
                        />
                    ) : (
                        <Styled.BlankImage></Styled.BlankImage>
                    )}
                </TableCell>
                <TableCell>{props.title}</TableCell>
                <TableCell style={{ width: "1px", whiteSpace: "nowrap" }}>
                    <Grow in={selection === props.index}>
                        <Styled.Menu>
                            <Tooltip title="View">
                                <Button onClick={() => router.push(`/comic/view/${props._id}`)}>
                                    <VisibilityIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Unpublish">
                                <Button
                                    onClick={e => {
                                        handleUnpublish(e);
                                    }}
                                >
                                    <UnpublishedIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <Button
                                    onClick={e => {
                                        handleDelete(e);
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </Tooltip>
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
