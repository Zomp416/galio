import React, { useState } from "react";
import Link from "next/link";
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
import { useAuthContext } from "../../../context/authcontext";

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
                style={{ backgroundColor: "grey", borderRadius: "50%" }}
            />
            <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold">
                    <Link href={{ pathname: "/user/" + user2?.username!, query: user2?.username! }}>
                        <a style={{ textDecoration: "none", color: "black" }}>{user2?.username!}</a>
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

const Hero: React.FC<{ user2?: any; userSubs?: any }> = ({ user2, userSubs }) => {
    const [tags, setTags] = useState<string[]>(["Comedy", "College"]);
    const [category, setCategory] = useState<string>("Comics");
    const [time, setTime] = useState<string>("Today");
    const [sort, setSort] = useState<string>("alpha");
    const { user } = useAuthContext();
    const finalUser = user?.username! !== user2.username! ? user2 : user;

    return (
        <>
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
        </>
    );
};

export default Hero;
