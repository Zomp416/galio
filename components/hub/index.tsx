import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";

import SortFilter from "./sortfilter";
import BigCard from "./bigcard";
import SmallCard from "./smallcard";
import * as Styled from "./styles";
import { useHubContext } from "../../context/hubcontext";
import { searchComic } from "../../util/zileanComic";
import { searchStory } from "../../util/zileanStory";
import { IMAGE_URI } from "../../util/config";

const Hub: React.FC = () => {
    const { time, sort, category, featured, others, setOthers, setFeatured } = useHubContext();

    useEffect(() => {
        if (category === "comic")
            searchComic({ time, sort, page: 0, limit: 15 }).then(res => {
                if (res.error) alert(res.error);
                else setOthers(res.data.results);
            });
        else
            searchStory({ time, sort, page: 0, limit: 15 }).then(res => {
                if (res.error) alert(res.error);
                else setOthers(res.data.results);
            });
    }, [category, time, sort, setOthers]);

    useEffect(() => {
        if (category === "comic")
            searchComic({ time: "day", sort: "views", page: 0, limit: 5 }).then(res => {
                if (res.error) alert(res.error);
                else setFeatured(res.data.results);
            });
        else
            searchStory({ time: "day", sort: "views", page: 0, limit: 5 }).then(res => {
                if (res.error) alert(res.error);
                else setFeatured(res.data.results);
            });
    }, [category, setFeatured]);

    return (
        <Styled.HubOuter>
            <Styled.HubInner>
                <Styled.CarouselWrapper>
                    <Carousel
                        indicatorContainerProps={{
                            style: { position: "absolute", bottom: 15, zIndex: 5 },
                        }}
                        height={400}
                    >
                        {featured.map((obj, i) => (
                            <BigCard
                                key={i}
                                _id={obj._id}
                                category={category}
                                title={obj.title}
                                description={obj.description}
                                author={obj.author.username}
                                splashURL={
                                    category === "comic"
                                        ? IMAGE_URI + obj.renderedImage
                                        : IMAGE_URI + obj.coverart
                                }
                                rating={obj.rating}
                                views={obj.views}
                            />
                        ))}
                    </Carousel>
                </Styled.CarouselWrapper>
                <SortFilter />
                <Styled.Grid>
                    {others.map((obj, i) => (
                        <SmallCard
                            key={i}
                            _id={obj._id}
                            category={category}
                            title={obj.title}
                            author={obj.author.username}
                            splashURL={
                                category === "comic"
                                    ? IMAGE_URI + obj.renderedImage
                                    : IMAGE_URI + obj.coverart
                            }
                            rating={obj.rating}
                            views={obj.views}
                        />
                    ))}
                </Styled.Grid>
            </Styled.HubInner>
        </Styled.HubOuter>
    );
};

export default Hub;
