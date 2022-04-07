import React, { useState } from "react";
import { MenuItem, Typography } from "@mui/material";

import * as Styled from "./styles";

const Sortfilter: React.FC = () => {
    const [filter, setFilter] = useState("Day");
    const [sort, setSort] = useState("Popular");

    const onSetFilter = (e: any) => {
        setFilter(e.target.value);
    };

    const onSetSort = (e: any) => {
        setSort(e.target.value);
    };

    return (
        <Styled.SortFilter className="gridoptions">
            <Styled.FloatLeft className="floatLeft">
                <Typography variant="h6" width={"100%"}>
                    More Comics:
                </Typography>
            </Styled.FloatLeft>
            <Styled.FloatRight className="floatRight">
                <Styled.Select
                    variant="standard"
                    disableUnderline
                    value={filter}
                    onChange={onSetFilter}
                >
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Week">Week</MenuItem>
                    <MenuItem value="Month">Month</MenuItem>
                    <MenuItem value="Year">Year</MenuItem>
                    <MenuItem value="All Time">All Time</MenuItem>
                </Styled.Select>
                <Styled.Select
                    variant={"standard"}
                    disableUnderline
                    value={sort}
                    onChange={onSetSort}
                >
                    <MenuItem value="Popular">Popular</MenuItem>
                    <MenuItem value="Recent">Rating</MenuItem>
                    <MenuItem value="Recent">New</MenuItem>
                </Styled.Select>
            </Styled.FloatRight>
        </Styled.SortFilter>
    );
};

export default Sortfilter;
