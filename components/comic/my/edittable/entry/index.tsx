import React from "react";
// import { useRouter } from "next/router";
import { TableRow, TableCell, Collapse } from "@mui/material";
import moment from "moment";

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
                <TableCell align="left" style={{ width: "1px", whiteSpace: "nowrap" }}>
                    {moment(props.updatedAt).calendar(null, {
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

export default EditTable;
