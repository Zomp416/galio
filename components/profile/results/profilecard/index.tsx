import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { getUserFromID } from "../../../../util/zileanUser";
import * as Styled from "./styles";

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
            setUser(data.data);
            setProfilePicture(data.data?.profilePicture);
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
            <Link href={"/user/" + user?.username}>
                <a style={{ textDecoration: "none", color: "black" }}>
                    {profilePicture ? (
                        <CardMedia
                            component="img"
                            image={
                                "https://zomp-media.s3.us-east-1.amazonaws.com/" + profilePicture
                            }
                            height="200px"
                            style={{
                                backgroundColor: "grey",
                                border: "1px solid black",
                                borderRadius: "50%",
                            }}
                        />
                    ) : (
                        <Styled.AvatarProfile></Styled.AvatarProfile>
                    )}
                    <CardContent>
                        <Typography fontWeight="bold">{user?.username}</Typography>
                    </CardContent>
                </a>
            </Link>
        </Card>
    );
};

export default ProfileCard;
