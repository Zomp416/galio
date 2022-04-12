import React, { useState } from "react";
// import Link from "next/link";
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
                        Jack007
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "19px",
                            color: "black",
                            marginBottom: "10px",
                        }}
                    >
                        1.4k Subscribers
                    </Typography>
                    <Styled.SubscribeButton variant="contained" color="primary">
                        Subscribe
                    </Styled.SubscribeButton>
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
                        You would not believe your eyes If ten million fireflies, lit up the world
                        as I fell asleep. Cause they fill the open air and leave teardrops
                        everywhere. Youd think me rude but I would just stand and stare -Rick Astley
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
