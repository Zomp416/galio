import React from "react";
import { useRouter } from "next/router";
import { TableRow, TableCell, Grow, Button } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { useToastContext } from "../../../../../context/toastcontext";
import { publishStory, deleteStory } from "../../../../../util/zileanStory";

import { useSelectionContext } from "../..";
import * as Styled from "./styles";

interface Story {
    _id: string;
    title: string;
    coverart: string;
    updatedAt: Date;
    index: number;
}

const EditTable: React.FC<Story> = props => {
    const { selection, setSelection } = useSelectionContext();
    const { addToast } = useToastContext();
    const router = useRouter();

    const onSelect = () => {
        if (props.index == selection) setSelection!(-1);
        else setSelection!(props.index);
    };

    const handlePublish = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await publishStory(props._id);
        if (!data.error) {
            router.push({ pathname: "/story/my/" });
            addToast("success", `Published ${props.title}`);
        }
    };

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await deleteStory(props._id);
        if (!data.error) {
            router.push({ pathname: "/story/my/" });
            addToast("success", `Deleted ${props.title}`);
        }
    };

    return (
        <>
            <TableRow onClick={onSelect}>
                <TableCell style={{ width: "1px" }}>
                    {props.coverart ? (
                        <Styled.Image
                            src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + props.coverart}
                        />
                    ) : (
                        <Styled.BlankImage></Styled.BlankImage>
                    )}
                </TableCell>
                <TableCell>{props.title}</TableCell>
                <TableCell style={{ width: "1px", whiteSpace: "nowrap" }}>
                    <Grow in={selection === props.index}>
                        <Styled.Menu>
                            <Tooltip title="Edit">
                                <Button onClick={() => router.push(`/story/edit/${props._id}`)}>
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Publish">
                                <Button
                                    onClick={e => {
                                        handlePublish(e);
                                    }}
                                >
                                    <CheckCircleIcon />
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
                <TableCell align="left" style={{ width: "1px", whiteSpace: "nowrap" }}>
                    {moment(props.updatedAt).calendar(null, {
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

export default EditTable;
