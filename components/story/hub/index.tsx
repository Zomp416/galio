import React from "react";
import Carousel from "react-material-ui-carousel";

import SortFilter from "./sortfilter";
import BigCard from "./bigcard";
import SmallCard from "./smallcard";
import * as Styled from "./styles";

// TODO: remove later
const stories = [
    {
        _id: "a1",
        title: "Taquitos",
        author: "Cesare Lucido",
        description:
            "A taquito, tacos dorados, rolled taco, or flauta is a Mexican food dish that typically \
        consists of a small rolled-up tortilla that contains filling, including beef, cheese or chicken.",
        splashURL:
            "https://gimmedelicious.com/wp-content/uploads/2019/11/chicken-taquitos-feature-1.jpg",
        published: true,
        rating: 3.4,
        views: 567,
    },
    {
        _id: "a2",
        title: "Crewmate",
        author: "amogus",
        description:
            "Among Us is a 2018 online multiplayer social deduction game developed and published by \
        American game studio Innersloth. The game was inspired by the party game Mafia and the science \
        fiction horror film The Thing. The game allows for cross-platform play, first being released on \
        iOS and Android devices in June 2018 and on Windows later that year in November.",
        splashURL:
            "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/crewmate-indra-tirto.jpg",
        published: false,
        rating: 4.3,
        views: 210,
    },
    {
        _id: "a3",
        title: "League of Legends",
        author: "powder",
        description:
            "League of Legends (LoL), commonly referred to as League, is a 2009 multiplayer online battle \
            arena video game developed and published by Riot Games.",
        splashURL:
            "https://static.wikia.nocookie.net/leagueoflegends/images/3/34/Featherknight_PenguSkin.jpg",
        published: false,
        rating: 4.8,
        views: 101,
    },
];

let featured = [stories[1]];
let others = [stories[1]];
for (let i = 0; i < 4; i++) featured.push(stories[i % 3]);
for (let i = 0; i < 11; i++) others.push(stories[i % 3]);

const Hub: React.FC = () => {
    return (
        <Styled.MyStoriesOuter className="outer">
            <Styled.MyStoriesInner className="inner">
                <Styled.CarouselWrapper className="carouselwrapper">
                    <Carousel
                        indicatorContainerProps={{
                            style: { position: "absolute", bottom: 15, zIndex: 5 },
                        }}
                        height={400}
                    >
                        {featured.map((story, i) => (
                            <BigCard key={i} {...story} />
                        ))}
                    </Carousel>
                </Styled.CarouselWrapper>
                <SortFilter />
                <Styled.Grid className="storygrid">
                    {others.map((story, i) => (
                        <SmallCard key={i} {...story} />
                    ))}
                </Styled.Grid>
            </Styled.MyStoriesInner>
        </Styled.MyStoriesOuter>
    );
};

export default Hub;
