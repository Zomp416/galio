import React from "react";
import Carousel from "react-material-ui-carousel";
import { Typography } from "@mui/material";

import GridOptions from "./gridoptions";
import DetailedCard from "../cards/detailed";
import SimpleCard from "../cards/simple";
import * as Styled from "./styles";

const MyComics: React.FC = () => {
    const comic1 = {
        _id: "a1",
        title: "Taquitos",
        description:
            "A taquito, tacos dorados, rolled taco, or flauta is a Mexican food dish that typically \
            consists of a small rolled-up tortilla that contains filling, including beef, cheese or chicken.",
        splashURL: "/taquito.jpg",
        published: true,
        rating: 3.4,
        views: 567,
    };
    const comic2 = {
        _id: "a2",
        title: "Crewmate",
        description:
            "Among Us is a 2018 online multiplayer social deduction game developed and published by \
            American game studio Innersloth. The game was inspired by the party game Mafia and the science \
            fiction horror film The Thing. The game allows for cross-platform play, first being released on \
            iOS and Android devices in June 2018 and on Windows later that year in November.",
        splashURL: "/crewmate.png",
        published: false,
        rating: 4.3,
        views: 210,
    };
    const featured = [comic1, comic2, comic1, comic2];
    const others = Array(15).fill(comic1);
    return (
        <Styled.MyComicsOuter className="outer">
            <Styled.MyComicsInner className="inner">
                <Typography variant="h5" width={"100%"}>
                    My Comics
                </Typography>
                <Styled.CarouselWrapper className="carouselwrapper">
                    <Carousel
                        indicatorContainerProps={{
                            style: { position: "absolute", bottom: 9, zIndex: 5 },
                        }}
                    >
                        {featured.map((comic, i) => (
                            <DetailedCard key={i} comic={comic} />
                        ))}
                    </Carousel>
                </Styled.CarouselWrapper>
                <Styled.GridWrapper className="mainwrapper">
                    <GridOptions />
                    <Styled.Grid className="comicgrid">
                        {others.map((_, i) => (
                            <SimpleCard key={i} />
                        ))}
                    </Styled.Grid>
                </Styled.GridWrapper>
            </Styled.MyComicsInner>
        </Styled.MyComicsOuter>
    );
};

export default MyComics;
