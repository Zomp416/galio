import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from "@mui/material";

import Entry from "./entry";

interface Comic {
    _id: string;
    title: string;
    splashURL: string;
    updatedAt: Date;
}

const titleComparator = (order: number) => (a: any, b: any) => {
    return a.title > b.title ? order : -order;
};

const dateComparator = (order: number) => (a: any, b: any) => {
    return a.updatedAt > b.updatedAt ? order : -order;
};

const generalComparator = (type: string, order: number) => {
    if (type === "title") return titleComparator(order);
    else return dateComparator(order);
};

const EditTable: React.FC<{ comics: Comic[] }> = props => {
    const [sortType, setSortType] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);

    const onChangeSort = (param: string) => () => {
        if (sortType === param) setSortOrder(-sortOrder);
        else {
            setSortOrder(1);
            setSortType(param);
        }
    };

    return (
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell style={{ width: "1px" }} />
                    <TableCell>
                        <TableSortLabel
                            active={sortType === "title"}
                            direction={sortOrder === 1 ? "asc" : "desc"}
                            onClick={onChangeSort("title")}
                        >
                            Name
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="left" style={{ width: "1px", whiteSpace: "nowrap" }}>
                        <TableSortLabel
                            active={sortType === "date"}
                            direction={sortOrder === 1 ? "asc" : "desc"}
                            onClick={onChangeSort("date")}
                        >
                            Last Modified
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.comics.sort(generalComparator(sortType, sortOrder)).map((comic, i) => (
                    <Entry {...comic} index={i} key={i} />
                ))}
            </TableBody>
        </Table>
    );
};

export default EditTable;
