import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Typography, InputBase } from "@mui/material";
import debounce from "lodash.debounce";
import { searchComic } from "../../util/zileanComic";
import { searchStory } from "../../util/zileanStory";
import { searchUser } from "../../util/zileanUser";
import { useSearchContext } from "../../context/searchcontext";

const SearchBar: React.FC = () => {
    const { category, queryText, time, sort, page, setQueryText, setResults } = useSearchContext();

    const router = useRouter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const doDebouncedSearch = useCallback(
        debounce(
            async (query: {
                value?: string;
                time?: string;
                sort?: string;
                page?: number;
                limit?: number;
            }) => {
                if (category === "user") query.time = undefined;
                const { data, error } =
                    category === "comic"
                        ? await searchComic(query)
                        : category === "story"
                        ? await searchStory(query)
                        : await searchUser(query);

                if (error) alert(error);
                if (data) setResults(data);
            },
            400
        ),
        [category]
    );

    useEffect(() => {
        if (typeof router.query.q === "string") setQueryText(router.query.q);
    }, [router, setQueryText]);

    useEffect(() => {
        doDebouncedSearch({ value: queryText, time, sort, page, limit: 4 });
    }, [queryText, time, sort, page, doDebouncedSearch]);

    return (
        <Root>
            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                }}
            >
                Results for:
            </Typography>
            <InputBase
                defaultValue={router.query.q}
                style={{
                    flexGrow: 1,
                }}
                sx={{
                    display: "inline-block",
                    backgroundColor: "white",
                    outline: "none",
                    border: "2px solid gray",
                    fontSize: "50px",
                    marginLeft: "15px",
                    "& .MuiInputBase-input": {
                        padding: "0px",
                        paddingLeft: "10px",
                    },
                }}
                onInput={e => setQueryText((e.target as HTMLTextAreaElement).value)}
            ></InputBase>
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin-bottom: 20px;
`;

export default SearchBar;
