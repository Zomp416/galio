import React, { useState } from "react";
import { useRouter } from "next/router";
import {
    Rating,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
} from "@mui/material";
import moment from "moment";

import * as Styled from "./styles";

interface Comic {
    _id: string;
    title: string;
    splashURL: string;
    publishedAt: Date;
    rating: number;
}

const titleComparator = (order: number) => (a: any, b: any) => {
    return a.title > b.title ? order : -order;
};

const ratingComparator = (order: number) => (a: any, b: any) => {
    return a.rating > b.rating ? order : -order;
};

const dateComparator = (order: number) => (a: any, b: any) => {
    return a.publishedAt > b.publishedAt ? order : -order;
};

const generalComparator = (type: string, order: number) => {
    if (type === "title") return titleComparator(order);
    if (type === "rating") return ratingComparator(order);
    else return dateComparator(order);
};

const PublishTable: React.FC<{ comics: Comic[] }> = props => {
    const [sortType, setSortType] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);
    const router = useRouter();

    const onChangeSort = (param: string) => () => {
        if (sortType === param) setSortOrder(-sortOrder);
        else {
            setSortOrder(1);
            setSortType(param);
        }
    };

    return (
        <>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: "1px" }} />
                        <TableCell>
                            <TableSortLabel
                                active={sortType === "title"}
                                direction={
                                    sortType === "title"
                                        ? sortOrder === 1
                                            ? "asc"
                                            : "desc"
                                        : "asc"
                                }
                                onClick={onChangeSort("title")}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortType === "rating"}
                                direction={
                                    sortType === "rating"
                                        ? sortOrder === 1
                                            ? "asc"
                                            : "desc"
                                        : "asc"
                                }
                                onClick={onChangeSort("rating")}
                            >
                                Rating
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="left" style={{ width: "1px", whiteSpace: "nowrap" }}>
                            <TableSortLabel
                                active={sortType === "date"}
                                direction={
                                    sortType === "date" ? (sortOrder === 1 ? "asc" : "desc") : "asc"
                                }
                                onClick={onChangeSort("date")}
                            >
                                Published
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.comics.sort(generalComparator(sortType, sortOrder)).map((comic, i) => (
                        <TableRow
                            key={i}
                            onClick={() => {
                                router.push(`/comic/view/${comic._id}`);
                            }}
                        >
                            <TableCell style={{ width: "1px" }}>
                                <Styled.Image src={comic.splashURL} />
                            </TableCell>
                            <TableCell>{comic.title}</TableCell>
                            <TableCell style={{ width: "1px" }}>
                                <Rating
                                    value={comic.rating}
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
                                {moment(comic.publishedAt).calendar(null, {
                                    sameDay: "[Today] h:mm a",
                                    lastDay: "[Yesterday]",
                                    lastWeek: "[Last] dddd",
                                    sameElse: "DD/MM/YYYY",
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default PublishTable;
