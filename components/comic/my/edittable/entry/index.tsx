import React from "react";
import { useRouter } from "next/router";
import { TableRow, TableCell, Grow, Button } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import { useSelectionContext } from "../..";
import * as Styled from "./styles";

interface Comic {
    _id: string;
    title: string;
    splashURL: string;
    updatedAt: Date;
    index: number;
}

const EditTable: React.FC<Comic> = props => {
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
                            <Tooltip title="Edit">
                                <Button onClick={() => router.push(`/comic/edit/${props._id}`)}>
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Publish">
                                <Button>
                                    <CheckCircleIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <Button>
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
