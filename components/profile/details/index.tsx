import React from "react";
import { useRouter } from "next/router";
import { Typography, Button } from "@mui/material";
import * as Styled from "./styles";
import { useAuthContext } from "../../../context/authcontext";
import { unsubscribe, subscribe } from "../../../util/zilean";

const Hero: React.FC<{ user2?: any }> = ({ user2 }) => {
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
            router.push({ pathname: "/user/" + finalUser.username });
        }
    };

    const handleUnsubscribe = async (event: React.FormEvent, user2id: any) => {
        event.preventDefault();
        const userid = { subscription: user2id };
        const data = await unsubscribe(userid);
        if (!data.error) {
            router.push({ pathname: "/user/" + finalUser.username });
        }
        subscribed = false;
    };

    return (
        <Styled.DetailsContainer>
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
        </Styled.DetailsContainer>
    );
};

export default Hero;
