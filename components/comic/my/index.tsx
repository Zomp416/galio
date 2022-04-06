import React from "react";
import Carousel from "react-material-ui-carousel";

import DetailedCard from "../cards/detailed";
import SimpleCard from "../cards/simple";
import * as Styled from "./styles";

const MyComics: React.FC = () => {
    const featured = Array(5).fill(0);
    const others = Array(15).fill(0);
    return (
        <Styled.MyComicsOuter className="outer">
            <Styled.MyComicsInner className="inner">
                <Styled.CarouselWrapper className="carouselwrapper">
                    <Carousel
                        indicatorContainerProps={{
                            style: { position: "absolute", bottom: 0, zIndex: 5 },
                        }}
                    >
                        {featured.map((item, i) => (
                            <DetailedCard />
                        ))}
                    </Carousel>
                </Styled.CarouselWrapper>
                <Styled.MainWrapper className="mainwrapper">
                    <Styled.ComicGrid className="comicgrid">
                        {others.map((item, i) => (
                            <SimpleCard />
                        ))}
                    </Styled.ComicGrid>
                </Styled.MainWrapper>
            </Styled.MyComicsInner>
        </Styled.MyComicsOuter>
    );
};

export default MyComics;
