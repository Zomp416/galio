import React from "react";
import Carousel from "react-material-ui-carousel";
import { Typography } from "@mui/material";

import GridOptions from "./gridoptions";
import DetailedCard from "../cards/detailed";
import SimpleCard from "../cards/simple";
import * as Styled from "./styles";

const MyComics: React.FC = () => {
    const featured = Array(5).fill(0);
    const others = Array(15).fill(0);
    return (
        <Styled.MyComicsOuter className="outer">
            <Styled.MyComicsInner className="inner">
                <Typography variant="h5" width={"100%"}>
                    My Comics
                </Typography>
                <Styled.CarouselWrapper className="carouselwrapper">
                    <Carousel
                        indicatorContainerProps={{
                            style: { position: "absolute", bottom: 15, zIndex: 5 },
                        }}
                        height={400}
                    >
                        {featured.map((_, i) => (
                            <DetailedCard key={i} />
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
