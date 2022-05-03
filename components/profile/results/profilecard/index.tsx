import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { getUserFromID, getUserProfilePicture } from "../../../../util/zileanUser";

interface User {
    username: string;
}

const ProfileCard: React.FC<{ user2?: any }> = ({ user2 }) => {
    const [user, setUser] = useState<User>();
    const [profilePicture, setProfilePicture] = useState();
    useEffect(() => {
        async function getUser() {
            const data = await getUserFromID(user2);
            if (data.error) alert(data.error);
            else setUser(data.data);

            if (data.data?.profilePicture) {
                const profile = await getUserProfilePicture(user2);
                if (profile.error) alert(profile.error);
                else setProfilePicture(profile.data?.profilePicture.imageURL);
            }
        }
        getUser();
    }, [user2]);

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
                image={
                    profilePicture
                        ? "https://zomp-media.s3.us-east-1.amazonaws.com/" + profilePicture
                        : ""
                }
                height="200px"
                style={{ backgroundColor: "grey", borderRadius: "50%" }}
            />
            <CardContent>
                <Typography fontWeight="bold">
                    <Link href={"/user/" + user?.username}>
                        <a style={{ textDecoration: "none", color: "black" }}>{user?.username}</a>
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
