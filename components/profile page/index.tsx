import React, { useState } from "react";
import { useRouter } from "next/router";
import {
    Typography,
    Divider,
    Select,
    MenuItem,
    Card,
    CardMedia,
    CardContent,
    Pagination,
    Button,
} from "@mui/material";
import * as Styled from "./styles";
import { useAuthContext } from "../../context/authcontext";
import { unsubscribe, subscribe } from "../../util/zilean";

const ResultCard: React.FC<{ user2?: any }> = ({ user2 }) => {
    const { user } = useAuthContext();
    const finalUser = user?.username! !== user2.username! ? user2 : user;

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
                    {finalUser?.username!}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    100 Views
                </Typography>
            </CardContent>
        </Card>
    );
};

const ProfileCard: React.FC<{ user2?: any }> = ({ user2 }) => {
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
                    {user2?.username!}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    100 Views
                </Typography>
            </CardContent>
        </Card>
    );
};

const Profile: React.FC<{ user2?: any; userSubs?: any }> = ({ user2, userSubs }) => {
    const [tags, setTags] = useState<string[]>(["Comedy", "College"]);
    const [category, setCategory] = useState<string>("Comics");
    const [time, setTime] = useState<string>("Today");
    const [sort, setSort] = useState<string>("alpha");
    const { user } = useAuthContext();
    const finalUser = user?.username! !== user2.username! ? user2 : user;
    const router = useRouter();
    let subscribed = false;

    if (finalUser.username === user2.username) {
        for (let i = 0; i < user?.subscriptions?.length!; i++) {
            if (user?.subscriptions![i] === user2._id) {
                subscribed = true;
            }
        }
    }

    const handleSubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await subscribe(userid);
        if (!data.error) {
            router.push({ pathname: "/user/" + finalUser.username, query: finalUser.username });
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await unsubscribe(userid);
        if (!data.error) {
            router.push({ pathname: "/user/" + finalUser.username, query: finalUser.username });
        }
        subscribed = false;
    };

    return (
        <Styled.UserContainer>
            <Styled.ProfileContainer>
                <Styled.ProfilePic></Styled.ProfilePic>
                <Styled.TextContainer>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "35px",
                            color: "black",
                        }}
                    >
                        {finalUser?.username!}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "19px",
                            color: "black",
                            marginBottom: "10px",
                        }}
                    >
                        {finalUser?.subscriberCount!} subscribers
                    </Typography>
                    {user?.username! !== user2.username! ? (
                        subscribed ? (
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: "60%", backgroundColor: "red" }}
                                onClick={e => {
                                    handleUnsubscribe(e, user2._id.toString());
                                }}
                            >
                                Unsubscribe
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: "60%" }}
                                onClick={e => {
                                    handleSubscribe(e, user2._id.toString());
                                }}
                            >
                                Subscribe
                            </Button>
                        )
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                router.push("/edit-account");
                            }}
                            style={{ width: "60%" }}
                        >
                            Edit Profile
                        </Button>
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
                        {finalUser?.about!}
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
                    {finalUser.username === user?.username ? (
                        <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
                    ) : (
                        <></>
                    )}
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
            {finalUser.username === user?.username && category === "Subscriptions" ? (
                <Styled.CardsContainer>
                    {userSubs.map(function (user: any, index: any) {
                        return <ProfileCard key={index} user2={user} />;
                    })}
                </Styled.CardsContainer>
            ) : (
                <Styled.CardsContainer>
                    <ResultCard user2={user2} />
                    <ResultCard user2={user2} />
                    <ResultCard user2={user2} />
                    <ResultCard user2={user2} />
                </Styled.CardsContainer>
            )}
            <Pagination />
            <Typography variant="h6" component="div" sx={{ marginTop: "10px" }}>
                {finalUser.username === user?.username && category === "Subscriptions"
                    ? userSubs.length + "-" + userSubs.length + " Results"
                    : "4-4 Results"}
            </Typography>
        </Styled.UserContainer>
    );
};

export default Profile;
