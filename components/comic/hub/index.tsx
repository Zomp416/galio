import React from "react";
import Carousel from "react-material-ui-carousel";

import SortFilter from "./sortfilter";
import BigCard from "./bigcard";
import SmallCard from "./smallcard";
import * as Styled from "./styles";

// TODO: remove later
const comic1 = {
    _id: "a1",
    title: "Taquitos",
    author: "Cesare Lucido",
    description:
        "A taquito, tacos dorados, rolled taco, or flauta is a Mexican food dish that typically \
        consists of a small rolled-up tortilla that contains filling, including beef, cheese or chicken.",
    splashURL: "/filler/taquito.jpg",
    published: true,
    rating: 3.4,
    views: 567,
};
const comic2 = {
    _id: "a2",
    title: "Crewmate",
    author: "amogus",
    description:
        "Among Us is a 2018 online multiplayer social deduction game developed and published by \
        American game studio Innersloth. The game was inspired by the party game Mafia and the science \
        fiction horror film The Thing. The game allows for cross-platform play, first being released on \
        iOS and Android devices in June 2018 and on Windows later that year in November.",
    splashURL: "/filler/crewmate.png",
    published: false,
    rating: 4.3,
    views: 210,
};

const featured = [comic1, comic2, comic1, comic2];
const others = Array(15).fill(comic1);

const Hub: React.FC = () => {
    return (
        <Styled.MyComicsOuter className="outer">
            <Styled.MyComicsInner className="inner">
                <Styled.CarouselWrapper className="carouselwrapper">
                    <Carousel
                        indicatorContainerProps={{
                            style: { position: "absolute", bottom: 15, zIndex: 5 },
                        }}
                        height={400}
                    >
                        {featured.map((comic, i) => (
                            <BigCard key={i} {...comic} />
                        ))}
                    </Carousel>
                </Styled.CarouselWrapper>
                <SortFilter />
                <Styled.Grid className="comicgrid">
                    {others.map((comic, i) => (
                        <SmallCard key={i} {...comic} />
                    ))}
                </Styled.Grid>
            </Styled.MyComicsInner>
        </Styled.MyComicsOuter>
    );
};

export default Hub;
