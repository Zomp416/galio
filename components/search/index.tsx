import React from "react";
import { Typography, Divider, Pagination } from "@mui/material";
import styled from "@emotion/styled";

import ResultCard from "./resultcard";
import TagDialog from "./tagdialog";
import SearchOptions from "./searchoptions";
import SearchBar from "./searchbar";
import { useSearchContext } from "../../context/searchcontext";

const Search: React.FC = () => {
    const { results, category, total, setPage } = useSearchContext();

    return (
        <SearchContainer>
            <TagDialog></TagDialog>
            <SearchBar></SearchBar>
            <SearchOptions></SearchOptions>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />
            <CardsContainer>
                {results.map(res => (
                    <ResultCard
                        _id={res._id}
                        key={res._id}
                        type={category}
                        title={category === "user" ? res.username : res.title}
                        link={
                            category === "user"
                                ? `user/${res.username}`
                                : `/${category}/view/${res._id}`
                        }
                        author={category === "user" ? "" : res.author.username}
                        splashURL={
                            category === "comic"
                                ? res.renderedImage
                                : category === "story"
                                ? res.coverart
                                : category === "user"
                                ? res.profilePicture
                                : ""
                        }
                        rating={res.ratingTotal / res.ratingCount}
                        views={res.views}
                        subscribers={res.subscriberCount}
                    />
                ))}
            </CardsContainer>
            <Pagination
                count={Math.ceil(total / 4)}
                onChange={(__: any, val: number) => setPage(val - 1)}
            />
            <Typography variant="h6" component="div" sx={{ marginTop: "10px" }}>
                {`${total} total results`}
            </Typography>
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
    width: 100%;
    padding: 30px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    margin-top: 50px;
`;

const CardsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
    margin-bottom: 40px;
`;

export default Search;
