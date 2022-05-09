import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";

import SortFilter from "./sortfilter";
import BigCard from "./bigcard";
import SmallCard from "./smallcard";
import * as Styled from "./styles";
import { useHubContext } from "../../../context/hubcontext";
import { searchComic } from "../../../util/zileanComic";
import { IMAGE_URI } from "../../../util/config";

const Hub: React.FC = () => {
    const { time, sort, featured, others, setOthers, setFeatured } = useHubContext();

    useEffect(() => {
        searchComic({ time, sort, page: 0, limit: 15 }).then(res => {
            if (res.error) alert(res.error);
            else setOthers(res.data.results);
        });
    }, [time, sort, setOthers]);

    useEffect(() => {
        searchComic({ time: "day", sort: "views", page: 0, limit: 5 }).then(res => {
            if (res.error) alert(res.error);
            else setFeatured(res.data.results);
        });
    }, [setFeatured]);

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
                            <BigCard
                                key={i}
                                _id={comic._id}
                                title={comic.title}
                                description={comic.description}
                                author={comic.author.username}
                                splashURL={IMAGE_URI + comic.renderedImage}
                                rating={comic.rating}
                                views={comic.views}
                            />
                        ))}
                    </Carousel>
                </Styled.CarouselWrapper>
                <SortFilter />
                <Styled.Grid className="comicgrid">
                    {others.map((comic, i) => (
                        <SmallCard
                            key={i}
                            _id={comic._id}
                            title={comic.title}
                            author={comic.author.username}
                            splashURL={IMAGE_URI + comic.renderedImage}
                            rating={comic.rating}
                            views={comic.views}
                        />
                    ))}
                </Styled.Grid>
            </Styled.MyComicsInner>
        </Styled.MyComicsOuter>
    );
};

export default Hub;
