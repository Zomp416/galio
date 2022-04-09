import React, { useState } from "react";
import { Typography } from "@mui/material";

import * as Styled from "./styles";
import EditTable from "./edittable";
import PublishTable from "./publishtable";

// TODO: remove later
const now = new Date();
const comics = [
    {
        _id: "a1",
        title: "Taquitos",
        splashURL:
            "https://gimmedelicious.com/wp-content/uploads/2019/11/chicken-taquitos-feature-1.jpg",
        updatedAt: new Date(now.getTime() - 300000000),
        publishedAt: new Date(now.getTime() - 600000000),
        rating: 3.4,
        views: 567,
    },
    {
        _id: "a2",
        title: "Crewmate",
        splashURL:
            "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/crewmate-indra-tirto.jpg",
        updatedAt: new Date(now.getTime() - 90000000),
        publishedAt: new Date(now.getTime() - 200000000),
        rating: 4.3,
        views: 210,
    },
    {
        _id: "a3",
        title: "League of Legends",
        splashURL:
            "https://static.wikia.nocookie.net/leagueoflegends/images/3/34/Featherknight_PenguSkin.jpg",
        updatedAt: new Date(now.getTime() - 10000000),
        publishedAt: new Date(now.getTime() - 50000000),
        rating: 4.8,
        views: 101,
    },
];

const MyComics: React.FC = () => {
    const [filter, setFilter] = useState("edit");

    const onSetFilter = (e: any) => {
        setFilter(e.target.value);
    };

    return (
        <Styled.MyComicsOuter className="outer">
            <Styled.MyComicsInner className="inner">
                <Styled.MyComicsHeader>
                    <Typography variant="h4">My Comics</Typography>
                    <Styled.ToggleButtonGroup
                        color="primary"
                        value={filter}
                        exclusive
                        onChange={onSetFilter}
                    >
                        <Styled.ToggleButton value="edit">Editing</Styled.ToggleButton>
                        <Styled.ToggleButton value="publish">Published</Styled.ToggleButton>
                    </Styled.ToggleButtonGroup>
                </Styled.MyComicsHeader>
                {filter === "edit" ? (
                    <EditTable comics={comics} />
                ) : (
                    <PublishTable comics={comics} />
                )}
            </Styled.MyComicsInner>
        </Styled.MyComicsOuter>
    );
};

export default MyComics;