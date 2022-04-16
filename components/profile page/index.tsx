import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/authcontext";
import { useUserContext } from "../../context/usercontext";
import { getImage, subscribe } from "../../util/zilean";

import {
    Typography,
    Divider,
    Select,
    MenuItem,
    Card,
    CardMedia,
    CardContent,
    Pagination,
} from "@mui/material";
import * as Styled from "./styles";

const ResultCard: React.FC = () => {
    return (
        <Card
            sx={{
                backgroundColor: "transparent",
                textAlign: "center",
                boxShadow: "none",
                width: "17.5%",
                borderRadius: "0",
            }}
        >
            <CardMedia
                component="img"
                height="200px"
                width="200px"
                image=""
                alt="Image"
                style={{ backgroundColor: "grey" }}
            />
            <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold">
                    Comic Title
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="bold">
                    MasonMa37
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    100 Views
                </Typography>
            </CardContent>
        </Card>
    );
};

const Profile: React.FC = () => {
    const [tags, setTags] = useState<string[]>(["Comedy", "College"]);
    const [category, setCategory] = useState<string>("Comics");
    const [time, setTime] = useState<string>("Today");
    const [sort, setSort] = useState<string>("alpha");
    const [picUrl, setPicUrl] = useState<string>(
        "http://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
    );
    const [subscribed, setSubscribed] = useState(false);
    const { user } = useAuthContext();
    const userview = useUserContext().user;

    useEffect(() => {
        if (userview?.profilePicture)
            getImage(userview?.profilePicture).then(res => "baseurl" + setPicUrl(res)); // TODO: what is baseurl??
    });
    useEffect(() => {
        if (user && userview) setSubscribed(user.subscriptions.includes(userview._id));
    }, [user, userview]);

    const toggleSubscribe = () => {
        if (!subscribed && userview) subscribe(userview?._id);
        setSubscribed(!subscribed);
    };

    return (
        <Styled.UserContainer>
            <Styled.ProfileContainer>
                <Styled.ProfilePic src={picUrl}></Styled.ProfilePic>
                <Styled.TextContainer>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "35px",
                            color: "black",
                        }}
                    >
                        {userview?.username}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "19px",
                            color: "black",
                            marginBottom: "10px",
                        }}
                    >
                        {userview?.subscriberCount} Subscribers
                    </Typography>
                    {user && user?._id !== userview?._id ? (
                        subscribed ? (
                            <Styled.SubscribeButton
                                variant="contained"
                                color="secondary"
                                onClick={toggleSubscribe}
                            >
                                Unsubscribe
                            </Styled.SubscribeButton>
                        ) : (
                            <Styled.SubscribeButton
                                variant="contained"
                                color="primary"
                                onClick={toggleSubscribe}
                            >
                                Subscribe
                            </Styled.SubscribeButton>
                        )
                    ) : (
                        <></>
                    )}
                </Styled.TextContainer>
                <Styled.AboutContainer>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "35px",
                            color: "black",
                        }}
                    >
                        About
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "16px",
                            color: "black",
                        }}
                    >
                        {userview?.about}
                    </Typography>
                </Styled.AboutContainer>
            </Styled.ProfileContainer>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />
            <Styled.FilterContainer>
                <Typography variant="h4" sx={{ fontWeight: "bold", marginRight: "20px" }}>
                    Tags:
                </Typography>
                <Styled.TagListContainer>
                    {tags.map((val, index) => (
                        <Styled.Tag key={`${index}-tag`}>{val}</Styled.Tag>
                    ))}
                </Styled.TagListContainer>
            </Styled.FilterContainer>
            <Styled.ResultsContainer>
                <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    onChange={e => {
                        setCategory(e.target.value);
                    }}
                    label="Category"
                    variant="standard"
                    sx={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                    }}
                >
                    <MenuItem value={"Comics"}>Comics</MenuItem>
                    <MenuItem value={"Stories"}>Stories</MenuItem>
                    {/* TODO add back users under subscribers and only show if it is the owner visiting own Profile */}
                </Select>
                <Styled.TagListContainer>
                    <Select
                        labelId="sort-label"
                        id="sort"
                        value={sort}
                        onChange={e => {
                            setSort(e.target.value);
                        }}
                        label="Views"
                        variant="standard"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                        }}
                    >
                        <MenuItem value={"alpha"}>A-Z</MenuItem>
                        <MenuItem value={"views"}>Most Viewed</MenuItem>
                        <MenuItem value={"rating"}>Highest Rated</MenuItem>
                    </Select>
                    <Select
                        labelId="time-label"
                        id="time"
                        value={time}
                        onChange={e => {
                            setTime(e.target.value);
                        }}
                        label="Time"
                        variant="standard"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            marginLeft: "20px",
                        }}
                    >
                        <MenuItem value={"Today"}>Today</MenuItem>
                        <MenuItem value={"Week"}>This Week</MenuItem>
                        <MenuItem value={"Month"}>This Month</MenuItem>
                        <MenuItem value={"Year"}>This Year</MenuItem>
                        <MenuItem value={"All"}>All Time</MenuItem>
                    </Select>
                </Styled.TagListContainer>
            </Styled.ResultsContainer>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />
            <Styled.CardsContainer>
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
            </Styled.CardsContainer>
            <Pagination />
            <Typography variant="h6" component="div" sx={{ marginTop: "10px" }}>
                4-4 Results
            </Typography>
        </Styled.UserContainer>
    );
};

export default Profile;
