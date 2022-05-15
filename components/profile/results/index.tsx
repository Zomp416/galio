import React, { useState } from "react";
import { Divider, Pagination, Stack, Tab, Tabs } from "@mui/material";
import * as Styled from "./styles";
import ComicCard from "./comiccard";
import StoryCard from "./storycard";
import ProfileCard from "./profilecard";

const Hero: React.FC<{ user2?: any; userSubs?: any }> = ({ user2, userSubs }) => {
    const [category, setCategory] = useState<string>("comics");

    //Kinda extra but quick fix for when stories has more pages than users and you set categories
    const [comicPage, setComicPage] = useState<number>(1);
    const [storyPage, setStoryPage] = useState<number>(1);
    const [userPage, setUserPage] = useState<number>(1);
    const comicsPerPage = 4;
    const storiesPerPage = 4;
    const usersPerPage = 4;

    const onSetCategory = (_: any, val: any) => {
        setCategory(val);
    };

    return (
        <Styled.ResultsContainer>
            <Tabs value={category} onChange={onSetCategory}>
                <Tab label="Comics" value={"comics"} />
                <Tab label="Stories" value={"stories"} />
                <Tab label="Subscriptions" value={"subscriptions"} />
            </Tabs>
            <Divider sx={{ width: "100%", marginBottom: "30px" }} />

            {category === "comics" ? (
                <>
                    <Stack>
                        {user2.comics
                            .filter(
                                (comic: any, index: any) =>
                                    index >= comicsPerPage * (comicPage - 1) &&
                                    index < comicsPerPage * comicPage
                            )
                            .map(function (comic: any, index: any) {
                                return <ComicCard key={index} comic={comic} user={user2} />;
                            })}
                    </Stack>
                    <Styled.Pagination>
                        <Pagination
                            count={Math.ceil(user2.comics.length / comicsPerPage)}
                            onChange={(__: any, val: number) => setComicPage(val)}
                        />
                    </Styled.Pagination>
                </>
            ) : category === "stories" ? (
                <>
                    <Stack>
                        {user2.stories
                            .filter(
                                (story: any, index: any) =>
                                    index >= storiesPerPage * (storyPage - 1) &&
                                    index < storiesPerPage * storyPage
                            )
                            .map(function (story: any, index: any) {
                                return <StoryCard key={index} story={story} user={user2} />;
                            })}
                    </Stack>
                    <Styled.Pagination>
                        <Pagination
                            count={Math.ceil(user2.stories.length / storiesPerPage)}
                            onChange={(__: any, val: number) => setStoryPage(val)}
                        />
                    </Styled.Pagination>
                </>
            ) : (
                <>
                    <Styled.CardsContainer>
                        {userSubs
                            .filter(
                                (user: any, index: any) =>
                                    index >= usersPerPage * (userPage - 1) &&
                                    index < usersPerPage * userPage
                            )
                            .map(function (user: any, index: any) {
                                return <ProfileCard key={index} user2={user} />;
                            })}
                    </Styled.CardsContainer>
                    <Styled.Pagination>
                        <Pagination
                            count={Math.ceil(userSubs.length / usersPerPage)}
                            onChange={(__: any, val: number) => setUserPage(val)}
                        />
                    </Styled.Pagination>
                </>
            )}
        </Styled.ResultsContainer>
    );
};

export default Hero;
