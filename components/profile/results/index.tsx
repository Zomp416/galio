import React, { useState } from "react";
import { Divider, Select, MenuItem, Pagination, Stack, Tab, Tabs } from "@mui/material";
import * as Styled from "./styles";
import ComicCard from "./comiccard";
import StoryCard from "./storycard";
import ProfileCard from "./profilecard";

const Hero: React.FC<{ user2?: any; userSubs?: any }> = ({ user2, userSubs }) => {
    const [category, setCategory] = useState<string>("comics");
    const [time, setTime] = useState<string>("Today");
    const [sort, setSort] = useState<string>("alpha");

    const onSetCategory = (_: any, val: any) => {
        setCategory(val);
    };
    const onSetSort = (e: any) => {
        setSort(e.target.value);
    };
    const onSetTime = (e: any) => {
        setTime(e.target.value);
    };

    return (
        <Styled.ResultsContainer>
            <Tabs value={category} onChange={onSetCategory}>
                <Tab label="Comics" value={"comics"} />
                <Tab label="Stories" value={"stories"} />
                <Tab label="Subscriptions" value={"subscriptions"} />
            </Tabs>
            <Styled.TagSortFilterContainer>
                <Styled.TagContainer></Styled.TagContainer>``
                <Styled.SortFilterContainer>
                    <Select value={sort} onChange={onSetSort} label="Views" variant="standard">
                        <MenuItem value={"alpha"}>A-Z</MenuItem>
                        <MenuItem value={"views"}>Most Viewed</MenuItem>
                        <MenuItem value={"rtaing"}>Highest Rated</MenuItem>
                    </Select>
                    <Select value={time} onChange={onSetTime} label="Time" variant="standard">
                        <MenuItem value={"Today"}>Today</MenuItem>
                        <MenuItem value={"Week"}>This Week</MenuItem>
                        <MenuItem value={"Month"}>This Month</MenuItem>
                        <MenuItem value={"Year"}>This Year</MenuItem>
                        <MenuItem value={"All"}>All Time</MenuItem>
                    </Select>
                </Styled.SortFilterContainer>
            </Styled.TagSortFilterContainer>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />

            {category === "comics" ? (
                <Stack>
                    {user2.comics.map(function (comic: any, index: any) {
                        return <ComicCard key={index} comic={comic} user={user2} />;
                    })}
                </Stack>
            ) : category === "stories" ? (
                <Stack>
                    {user2.stories.map(function (story: any, index: any) {
                        return <StoryCard key={index} story={story} user={user2} />;
                    })}
                </Stack>
            ) : (
                <Styled.CardsContainer>
                    {userSubs.map(function (user: any, index: any) {
                        return <ProfileCard key={index} user2={user} />;
                    })}
                </Styled.CardsContainer>
            )}

            <Styled.Pagination>
                <Pagination />
            </Styled.Pagination>
        </Styled.ResultsContainer>
    );
};

export default Hero;
