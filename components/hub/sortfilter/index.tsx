import React from "react";
import { MenuItem, Typography, ToggleButtonGroup } from "@mui/material";
import { useHubContext } from "../../../context/hubcontext";

import * as Styled from "./styles";

const Sortfilter: React.FC = () => {
    const { time, sort, setTime, setSort } = useHubContext();

    return (
        <Styled.SortFilter className="gridoptions">
            <ToggleButtonGroup
                color="primary"
                value={sort}
                exclusive
                onChange={(__, val: string) => {
                    setSort(val);
                    if (val === "time" || val === "trending") setTime("all");
                }}
            >
                <Styled.ToggleButton value="trending">Trending</Styled.ToggleButton>
                <Styled.ToggleButton value="time">New</Styled.ToggleButton>
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
                        value={time}
                        onChange={(e: any) => setTime(e.target.value)}
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
