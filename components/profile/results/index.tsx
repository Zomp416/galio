import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Typography,
    Divider,
    Select,
    MenuItem,
    Card,
    CardMedia,
    CardContent,
    Pagination,
    Stack,
    Tab,
    Tabs,
} from "@mui/material";
import * as Styled from "./styles";
import { useAuthContext } from "../../../context/authcontext";

const ResultCard: React.FC<{ user2?: any }> = ({ user2 }) => {
    const { user } = useAuthContext();
    const finalUser = user?.username! === user2.username! ? user : user2;

    return (
        <Styled.ResultCard>
            <Styled.CardThumbnailContainer>
                <Styled.CardThumbnail src="http://phototours.us/wp-content/uploads/2017/12/20036014.jpg" />
            </Styled.CardThumbnailContainer>
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
        </Styled.ResultCard>
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
    const [category, setCategory] = useState<string>("comics");
    const [time, setTime] = useState<string>("Today");
    const [sort, setSort] = useState<string>("alpha");
    const { user } = useAuthContext();
    const finalUser = user?.username! !== user2.username! ? user2 : user;

    const onSetCategory = (_: any, val: any) => {
        setCategory(val);
    };
    const onSetSort = (e: any) => {
        setSort(e.target.value);
    };
    const onSetTime = (e: any) => {
        setTime(e.target.value);
    };

    return (
        <Styled.ResultsContainer>
            <Tabs value={category} onChange={onSetCategory}>
                <Tab label="Comics" value={"comics"} />
                <Tab label="Stories" value={"stories"} />
                <Tab label="Subscriptions" value={"subscriptions"} />
            </Tabs>
            <Styled.TagSortFilterContainer>
                <Styled.TagContainer>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginRight: "20px" }}>
                        Tags:
                    </Typography>
                    {tags.map((val, index) => (
                        <Styled.Tag key={`${index}-tag`}>{val}</Styled.Tag>
                    ))}
                </Styled.TagContainer>
                <Styled.SortFilterContainer>
                    <Select value={sort} onChange={onSetSort} label="Views" variant="standard">
                        <MenuItem value={"alpha"}>A-Z</MenuItem>
                        <MenuItem value={"views"}>Most Viewed</MenuItem>
                        <MenuItem value={"rating"}>Highest Rated</MenuItem>
                    </Select>
                    <Select value={time} onChange={onSetTime} label="Time" variant="standard">
                        <MenuItem value={"Today"}>Today</MenuItem>
                        <MenuItem value={"Week"}>This Week</MenuItem>
                        <MenuItem value={"Month"}>This Month</MenuItem>
                        <MenuItem value={"Year"}>This Year</MenuItem>
                        <MenuItem value={"All"}>All Time</MenuItem>
                    </Select>
                </Styled.SortFilterContainer>
            </Styled.TagSortFilterContainer>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />
            {finalUser.username === user?.username && category === "Subscriptions" ? (
                <Styled.CardsContainer>
                    {userSubs.map(function (user: any, index: any) {
                        return <ProfileCard key={index} user2={user} />;
                    })}
                </Styled.CardsContainer>
            ) : (
                <Stack>
                    <ResultCard user2={user2} />
                    <ResultCard user2={user2} />
                    <ResultCard user2={user2} />
                    <ResultCard user2={user2} />
                </Stack>
            )}
            <Styled.Pagination>
                <Pagination />
                {/* Personally not a fan of this: */}
                {/* <Typography variant="h6" component="div" sx={{ marginTop: "10px" }}>
                    {finalUser.username === user?.username && category === "Subscriptions"
                        ? userSubs.length + "-" + userSubs.length + " Results"
                        : "4-4 Results"}
                </Typography> */}
            </Styled.Pagination>
        </Styled.ResultsContainer>
    );
};

export default Hero;