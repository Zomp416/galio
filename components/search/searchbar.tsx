import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Typography, InputBase } from "@mui/material";
import debounce from "lodash.debounce";
import { searchComic } from "../../util/zileanComic";
import { useSearchContext } from "../../context/searchcontext";

const SearchBar: React.FC = () => {
    const { page, setResults } = useSearchContext();

    const router = useRouter();

    const doDebouncedSearch = debounce(async query => {
        console.log("triggered search ", query);
        const { data, error } = await searchComic({ value: query, page: page, limit: 4 });
        if (error) alert(error);
        if (data) setResults(data);
    }, 800);

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
                onInput={e => doDebouncedSearch((e.target as HTMLTextAreaElement).value)}
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
