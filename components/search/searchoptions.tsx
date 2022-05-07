import React from "react";
import styled from "@emotion/styled";

import { Typography, Select, MenuItem } from "@mui/material";
import { useSearchContext } from "../../context/searchcontext";

const SearchOptions: React.FC = () => {
    const { tags, category, time, sort, setModalOpen, setCategory, setTime, setSort } =
        useSearchContext();

    return (
        <>
            <TagRow>
                <Typography variant="h4" sx={{ fontWeight: "bold", marginRight: "20px" }}>
                    Filter Tags:
                </Typography>
                <Row>
                    {tags.map((val, index) => (
                        <Tag key={`${index}-tag`}>{val}</Tag>
                    ))}
                    <ManageTag
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >
                        Manage Tags
                    </ManageTag>
                </Row>
            </TagRow>
            <SpacedRow>
                <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    onChange={e => {
                        setCategory(e.target.value);
                    }}
                    label="Category"
                    variant="standard"
                    sx={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                    }}
                >
                    <MenuItem value={"comic"}>Comics</MenuItem>
                    <MenuItem value={"story"}>Stories</MenuItem>
                    <MenuItem value={"user"}>Users</MenuItem>
                </Select>
                <Row>
                    <Select
                        labelId="sort-label"
                        id="sort"
                        value={sort}
                        onChange={e => {
                            setSort(e.target.value);
                        }}
                        label="Views"
                        variant="standard"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                        }}
                    >
                        <MenuItem value={"alpha"}>A-Z</MenuItem>
                        <MenuItem value={"views"}>Most Viewed</MenuItem>
                        <MenuItem value={"rating"}>Highest Rated</MenuItem>
                    </Select>
                    <Select
                        labelId="time-label"
                        id="time"
                        value={time}
                        onChange={e => {
                            setTime(e.target.value);
                        }}
                        label="Time"
                        variant="standard"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            marginLeft: "20px",
                        }}
                    >
                        <MenuItem value={"Today"}>Today</MenuItem>
                        <MenuItem value={"Week"}>This Week</MenuItem>
                        <MenuItem value={"Month"}>This Month</MenuItem>
                        <MenuItem value={"Year"}>This Year</MenuItem>
                        <MenuItem value={"All"}>All Time</MenuItem>
                    </Select>
                </Row>
            </SpacedRow>
        </>
    );
};

export default SearchOptions;

const TagRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-bottom: 30px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SpacedRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Tag = styled.div`
    background-color: white;
    border: 2px solid #39a78e;
    border-radius: 15px;
    height: 30px;
    padding: 3px 10px;
    margin-right: 10px;
`;

const ManageTag = styled(Tag)`
    background-color: #39a78e;
    border: 2px dashed black;
    font-weight: bold;

    :hover {
        background-color: #2e8c76;
        border: 2px dashed black;
        cursor: pointer;
    }
`;
