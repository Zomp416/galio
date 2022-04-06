import React from "react";
import Carousel from "react-material-ui-carousel";

import DetailedCard from "../cards/detailed";
import * as Styled from "./styles";

const MyComics: React.FC = () => {
    return (
        <>
            <Styled.MyComicsOuter className="outer">
                <Styled.MyComicsInner className="inner">
                    <Styled.CarouselWrapper className="carouselwrapper">
                        <Carousel
                            indicatorContainerProps={{
                                style: { position: "absolute", bottom: 0, zIndex: 5 },
                            }}
                        >
                            {[1, 2, 3].map((item, i) => (
                                <DetailedCard />
                            ))}
                        </Carousel>
                    </Styled.CarouselWrapper>
                </Styled.MyComicsInner>
            </Styled.MyComicsOuter>
        </>
    );
};

export default MyComics;
