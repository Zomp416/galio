import React, { useState } from "react";
import { useRouter } from "next/router";
import { Typography, Button } from "@mui/material";
import * as Styled from "./styles";
import { useAuthContext } from "../../../context/authcontext";
import { unsubscribe, subscribe } from "../../../util/zileanUser";

const Hero: React.FC<{ user2?: any; userProfile?: any }> = ({ user2, userProfile }) => {
    const { user } = useAuthContext();
    const router = useRouter();

    let initialSubscribe = false;
    for (let i = 0; i < user?.subscriptions?.length!; i++) {
        if (user?.subscriptions![i] === user2._id) {
            initialSubscribe = true;
        }
    }
    const [subscribed, setSubscribed] = useState<boolean>(initialSubscribe);
    const [subscribers, setSubscribers] = useState<number>(user2.subscriberCount);

    const handleSubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await subscribe(userid);
        if (!data.error) {
            setSubscribed(true);
            setSubscribers(subscribers + 1);
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await unsubscribe(userid);
        if (!data.error) {
            setSubscribed(false);
            setSubscribers(subscribers - 1);
        }
    };

    return (
        <Styled.DetailsContainer>
            {userProfile === null ? (
                <Styled.AvatarProfile></Styled.AvatarProfile>
            ) : (
                <Styled.ProfilePic
                    src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + userProfile}
                ></Styled.ProfilePic>
            )}
            <Styled.TextContainer>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "35px",
                        color: "black",
                    }}
                >
                    {user2?.username!}
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: "19px",
                        color: "black",
                        marginBottom: "10px",
                    }}
                >
                    {subscribers} subscribers
                </Typography>
                {!user ? (
                    <></>
                ) : user?.username! !== user2.username! ? (
                    subscribed ? (
                        <Button
                            variant="contained"
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
                    {user2?.about!}
                </Typography>
            </Styled.AboutContainer>
        </Styled.DetailsContainer>
    );
};

export default Hero;
