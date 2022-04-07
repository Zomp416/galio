import React, { useState } from "react";
import { MenuItem, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

import * as Styled from "./styles";

const Sortfilter: React.FC = () => {
    const [filter, setFilter] = useState("day");
    const [sort, setSort] = useState("trending");

    const onSetFilter = (e: any) => {
        setFilter(e.target.value);
    };

    const onSetSort = (_, val: string) => {
        setSort(val);
    };

    return (
        <Styled.SortFilter className="gridoptions">
            <ToggleButtonGroup color="primary" value={sort} exclusive onChange={onSetSort}>
                <Styled.ToggleButton value="trending">Trending</Styled.ToggleButton>
                <Styled.ToggleButton value="new">New</Styled.ToggleButton>
                <Styled.ToggleButton value="views">Most viewed</Styled.ToggleButton>
                <Styled.ToggleButton value="rating">Highest Rated</Styled.ToggleButton>
            </ToggleButtonGroup>
            {sort === "views" || sort === "rating" ? (
                <Styled.Filter>
                    <div>
                        <Typography style={{ fontSize: 14 }} color="rgba(0, 0, 0, 0.7)">
                            FROM
                        </Typography>
                    </div>
                    <Styled.Select
                        variant="standard"
                        disableUnderline
                        value={filter}
                        onChange={onSetFilter}
                    >
                        <MenuItem value="day">today</MenuItem>
                        <MenuItem value="week">this week</MenuItem>
                        <MenuItem value="month">this month</MenuItem>
                        <MenuItem value="year">this year</MenuItem>
                        <MenuItem value="all">all time</MenuItem>
                    </Styled.Select>
                </Styled.Filter>
            ) : (
                <></>
            )}
        </Styled.SortFilter>
    );
};

export default Sortfilter;
