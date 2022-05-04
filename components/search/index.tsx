import React from "react";
import { Typography, Divider, Pagination } from "@mui/material";

import * as Styled from "./styles";
import ResultCard from "./resultcard";
import TagDialog from "./tagdialog";
import SearchOptions from "./searchoptions";
import SearchBar from "./searchbar";
import { useSearchContext } from "../../context/searchcontext";

const Search: React.FC = () => {
    const { results } = useSearchContext();

    return (
        <Styled.SearchContainer>
            <TagDialog></TagDialog>
            <SearchBar></SearchBar>
            <SearchOptions></SearchOptions>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />
            <Styled.CardsContainer>
                {results.map(comic => (
                    <ResultCard
                        _id="id"
                        key="id"
                        title={comic.title}
                        author={comic.author}
                        splashURL={comic.splashURL}
                        rating={comic.rating}
                        views={comic.views}
                    />
                ))}
            </Styled.CardsContainer>
            <Pagination />
            <Typography variant="h6" component="div" sx={{ marginTop: "10px" }}>
                4-4 Results
            </Typography>
        </Styled.SearchContainer>
    );
};

export default Search;
